# Technical Requirements Document (TRD): Electronic Hub.bd

**Version:** 1.0 · **Date:** November 21, 2026 · **Related:** [PRD](./PRD.md), [DESIGN](./DESIGN.md), [FOLDER_ARCHITECTURE](./FOLDER_ARCHITECTURE.md), [TASKS](./TASKS.md)

This document translates the PRD into technical decisions. Where the PRD is silent, the choice made here is marked **(Decision)** and can be revisited via an ADR in `docs/adr/`.

---

## 1. Scope

Three web interfaces (Customer, Vendor, Admin) on one backend API. Customers get a multi-shop cart, checkout, orders and tracking; each shop fulfils its own order (see [ADR 0001](./adr/0001-customer-cart-and-checkout.md), which supersedes PRD 13.3).

## 2. System Overview

```
Browser ──> Nginx (TLS, rate limit) ─┬─> Next.js: web    (electronichub.bd)
                                     ├─> Next.js: vendor (vendor.electronichub.bd)
                                     ├─> Next.js: admin  (admin.electronichub.bd)
                                     └─> Go API (Gin)    (api.electronichub.bd)
                                            ├─ PostgreSQL (source of truth)
                                            ├─ Redis (cache, rate limit, sessions, pub/sub)
                                            ├─ Meilisearch (product/shop search index)
                                            ├─ S3-compatible storage (images, documents)
                                            └─ WebSocket hub (messaging, notifications)
```

## 3. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js (App Router), React, TypeScript strict | 3 apps in a Turborepo + pnpm monorepo |
| Styling / UI | Tailwind CSS, shadcn/ui (Radix) | Shared `packages/ui` |
| Data fetching | Server Components + TanStack Query (client) | |
| Forms / validation | react-hook-form + zod | Schemas shared in `packages/types` |
| i18n | next-intl | `bn`, `en` |
| Backend | Go + Gin, modular monolith | |
| ORM / migrations | GORM + golang-migrate (SQL migrations) **(Decision)** | Migrations are explicit SQL, not `AutoMigrate`, in production |
| Database | PostgreSQL 16 | |
| Cache | Redis | |
| Search | Meilisearch | Typo tolerance, filters, facets |
| Realtime | WebSocket (gorilla/websocket or nhooyr) + Redis pub/sub | Horizontal scale-ready |
| Auth | JWT access + refresh tokens, OTP | See section 7 |
| Storage | S3-compatible (Cloudflare R2 / AWS S3 / MinIO) | Presigned uploads |
| API docs | OpenAPI 3 via swaggo | `api-client` is generated from it |
| Deployment | Docker, Nginx | Compose for staging; orchestrator later |
| CI/CD | GitHub Actions | lint, test, build, image push |
| Observability | Structured logs (zerolog/slog), Sentry, Prometheus + Grafana | |

## 4. Repository Layout

Frontend monorepo (see [FOLDER_ARCHITECTURE](./FOLDER_ARCHITECTURE.md)). Backend is a separate repository `electronichub-api` **(Decision)** so that the Go and Node toolchains, CI and release cadence stay independent. The OpenAPI spec is the contract between them.

## 5. Backend Architecture

Modular monolith. Each module owns its handlers, service, repository and models; modules talk through service interfaces, never through another module's tables.

Modules (PRD 15.2): `auth`, `user`, `vendor`, `shop`, `product`, `category`, `inventory`, `search`, `messaging`, `notification`, `admin`, `report`, plus `cms`, `media`.

Layering per module: `handler (HTTP)` -> `service (business rules)` -> `repository (GORM)`. No business logic in handlers; no HTTP types in services.

API conventions:
- REST, JSON, base path `/api/v1`.
- Cursor or page pagination (`page`, `limit<=50`) with total count where needed.
- Error format: `{ "error": { "code": "PRODUCT_NOT_FOUND", "message": "...", "fields": {...} } }`.
- Idempotent PUT/DELETE; `Idempotency-Key` for risky POSTs (e.g. shop submission).
- Versioning by URL; breaking changes require `/v2`.

## 6. Data Model

Entities per PRD 16. Additional decisions:

- **IDs:** UUID v7 primary keys (time-ordered, index friendly) **(Decision)**.
- **Soft delete** (`deleted_at`) for users, shops, products; hard delete only for expired OTPs/tokens.
- **Timestamps:** `created_at`, `updated_at` on every table, UTC.
- **Money:** integer paisa (`BIGINT`, 1 BDT = 100 paisa) to avoid float errors **(Decision)**.
- **Shop slug:** unique, lowercase, immutable after approval unless admin changes it (redirect table `shop_slug_history`).
- **Product slug:** `{slugified-name}-{short-id}`.
- **Dynamic specs:** `product_attributes` (definition per category: key, type, unit, filterable) + `product_attribute_values` (typed columns or JSONB `value`). Filterable attributes are mirrored into Meilisearch.
- **Price tiers:** `bulk_price_tiers(product_id, min_qty, max_qty NULL, unit_price)`; retail is tier with `type=retail`. Constraint: non-overlapping ranges per product and type.
- **Multi-shop future:** `vendor_profiles 1..n shops` from day one (unique constraint on `vendor_id` enforces 1 shop for MVP and can be dropped later).
- **Messaging:** `conversations(customer_id, shop_id, product_id NULL)`, unique on (`customer_id`, `shop_id`, `product_id`); `messages` indexed by (`conversation_id`, `created_at`).
- **Status enums:** shop (`pending|approved|rejected|suspended`), product (`draft|pending|published|inactive|rejected`), stored as text with CHECK constraints.
- **Indexes:** products(shop_id, status), products(category_id, status, created_at), GIN on JSONB specs, trigram index on name/sku for fallback search.

## 7. Authentication & Authorization

- Registration/login with phone (OTP via SMS gateway, e.g. SSL Wireless / BulkSMSBD **(Decision: pick at implementation, behind a `SMSProvider` interface)**) and email + password. Google OAuth optional.
- Passwords: argon2id (or bcrypt cost >= 12).
- **Tokens:** access JWT 15 min; refresh token 30 days, rotated on use, stored hashed in `refresh_tokens`, revocable. Tokens delivered as **httpOnly, Secure, SameSite=Lax cookies** to the Next.js apps (no tokens in localStorage). Separate cookie domains per app; admin cookie is scoped to `admin.` host only.
- **RBAC:** roles `customer`, `vendor`, `admin` (admin sub-roles: `super_admin`, `moderator`, `support`). Enforced in Gin middleware and again in services (ownership checks: a vendor can only touch own shop's resources).
- OTP: 6 digits, 5-min expiry, max 5 attempts, resend cooldown 60s, per-phone and per-IP rate limits.
- Admin: mandatory strong password, optional TOTP 2FA (recommended before launch), IP allowlist at Nginx **(Decision, optional)**, every action written to `admin_activity_logs`.

## 8. Search

- Meilisearch indexes: `products`, `shops`.
- Product document: id, name, brand, category path, sku, mpn, filterable specs, retail/wholesale min prices, stock status, shop id/name/district, status, created_at, popularity score.
- Only `published` products from `approved` shops are indexed; shop suspension triggers bulk de-index.
- Sync: write-through via an outbox table + worker (reliable, retryable) **(Decision)**. Full reindex command available.
- Electronics-aware: synonyms (`resistor`/`রেজিস্টর`, `uF`/`µF`/`mfd`), custom tokenization so `100uF`, `100 uF`, `100µF` match; typo tolerance disabled for SKU/MPN fields.
- Sorting/ranking: newest, price asc/desc, most viewed, popular.
- Search API is proxied through the Go API (no public Meilisearch key exposed) **(Decision)**.

## 9. Messaging & Notifications

- WebSocket endpoint authenticates via cookie/short-lived ticket; one connection per tab; heartbeat 25s.
- Message flow: client -> WS -> persist in Postgres -> publish to Redis channel -> deliver to online recipient; offline recipients get in-app notification (+ email if configured).
- Delivery semantics: at-least-once with client-generated `client_msg_id` for de-duplication; ordered by server timestamp.
- Attachments: images only (jpeg/png/webp, <= 5 MB) via presigned upload; virus/type check on server.
- Read receipts per conversation (`last_read_message_id`).
- Block/report; blocked users cannot start new messages.
- Notifications: in-app (DB + WS push), email (queue), browser push (Web Push, opt-in).
- Background jobs via Redis-backed queue (asynq) **(Decision)**: emails, OTP SMS, search sync, image processing, stale-data cleanup.

## 10. Media & File Handling

- Direct-to-storage presigned PUT; backend records metadata after confirm.
- Images validated (MIME sniffing, size <= 5 MB, max dimensions), re-encoded to WebP/AVIF with thumbnails (worker) and stripped of EXIF.
- Vendor documents stored in a **private bucket**; access only via short-lived signed URLs for admins.
- Next.js `next/image` with the CDN/storage domain allowlisted.

## 11. Frontend Technical Requirements

- Server Components by default; client components only for interactivity.
- Public pages (`web`): SSR/ISR with `revalidate` + on-demand revalidation when product/shop changes; `generateMetadata`, Open Graph images, JSON-LD (`Product`, `Organization`, `BreadcrumbList`), `sitemap.xml` (split for large catalogs), `robots.txt`, canonical URLs, `hreflang` for bn/en.
- Dashboards (`vendor`, `admin`): `noindex`, client-heavy where needed, route protection in `middleware.ts`.
- Performance budgets (mobile, 4G): LCP <= 2.5s, INP <= 200ms, CLS <= 0.1; JS per route <= 170 KB gz for customer pages.
- State: server state in TanStack Query; local UI state in React; avoid global stores unless justified.
- API access only via `packages/api-client`; env validated with zod at startup.
- Error handling: route-level `error.tsx`, toast for mutation errors, Sentry for unexpected.

## 12. Security Requirements

(Extends PRD 15.3.)
- HTTPS everywhere, HSTS; secure headers via Nginx and Next (`CSP`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame-ancestors none).
- CSRF: SameSite cookies + CSRF token (double-submit) on state-changing requests from browsers.
- Input validation on server for every endpoint (go-playground/validator); output encoding; parameterized queries only (GORM, no string-built SQL).
- Rate limiting (Redis): global per-IP, stricter on auth/OTP/messaging/report endpoints.
- Upload hardening (see section 10); no user-controlled paths.
- Authorization tests for every vendor/admin endpoint (IDOR checks).
- Secrets in environment/secret manager, never in repo; `.env.example` only.
- Dependency scanning (Dependabot, `govulncheck`, `pnpm audit`) in CI.
- Privacy: owner name/contact shown per shop privacy settings; message content accessible to admins only through the reported-content workflow (PRD 10.8) and audited.
- Backups encrypted; PII minimization in logs (no OTPs, tokens, passwords).

## 13. Non-Functional Requirements

| Area | Target |
|---|---|
| Availability | 99.5% monthly at launch (single region), upgrade path to 99.9% |
| API latency | p95 < 300 ms for reads, < 600 ms for writes (excluding uploads) |
| Search latency | p95 < 150 ms |
| Scale (year 1) | 5k shops, 500k products, 100k MAU, 2k concurrent WS connections |
| Backups | PostgreSQL daily full + WAL/PITR; restore drill each quarter; RPO <= 15 min, RTO <= 4 h |
| Browser support | Last 2 versions of Chrome, Edge, Firefox, Safari; Android Chrome, iOS Safari 15+ |
| Accessibility | WCAG 2.1 AA |
| i18n | Bangla + English, UTF-8 everywhere, DB collation supports Bangla |

## 14. Environments & Deployment

- Environments: `local` (docker compose: postgres, redis, meilisearch, minio), `staging`, `production`.
- Each app builds into its own Docker image (Next.js `output: "standalone"`); Go API as a static binary image.
- Config via environment variables; 12-factor.
- Migrations run as a release step before the new API version receives traffic; migrations must be backward compatible (expand -> migrate -> contract).
- Zero-downtime: rolling deploy behind Nginx; health endpoints `/healthz` (liveness) and `/readyz` (readiness).

## 15. Testing Strategy

| Level | Tools | Coverage goal |
|---|---|---|
| Go unit (services) | `testing`, testify | Business rules, pricing tiers, state transitions |
| Go integration (repo/API) | testcontainers (Postgres/Redis/Meili) | Critical flows, authz |
| Frontend unit/component | Vitest + Testing Library | Shared UI, hooks, utils |
| E2E | Playwright | Register -> create shop -> approve -> add product -> search -> message |
| Contract | OpenAPI diff in CI | No unnoticed breaking changes |
| Performance | k6 (API/search), Lighthouse CI (web) | Budgets in section 11/13 |
| Security | OWASP ZAP baseline, dependency scans | Before launch |
| Responsive/a11y | Playwright viewports, axe-core | Breakpoints from DESIGN section 5 |

CI gate: lint + typecheck + unit + build on every PR; E2E on main/staging.

## 16. Analytics & Tracking

- Product views, shop views, and inquiry counts power the vendor dashboard (PRD 8.1). Recorded via a lightweight `POST /events` beacon, deduplicated per session/IP window, aggregated by a worker into daily counters (not row-per-view queries) **(Decision)**.
- Privacy-respecting web analytics (e.g. Plausible/GA4) for marketing; cookie consent banner where required.

## 17. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Stale stock/price data (vendors manage manually) | "Last updated" timestamp on listings; low-stock reminders; vendor nudges; future CSV bulk import |
| Spam / fake vendors & listings | Admin approval, report flow, rate limits, phone OTP, document verification |
| Search quality for part numbers | Dedicated SKU/MPN fields, custom tokenizer, synonyms, search analytics to tune |
| SMS delivery/cost in BD | Provider abstraction, fallback provider, email OTP alternative |
| Off-platform deals bypass platform | Out of scope for MVP (monetization via subscriptions/ads later, PRD 19) |
| WebSocket scaling | Redis pub/sub from day one; stateless WS nodes |
| Monorepo complexity for small team | Start with `web` + `vendor`; add `admin` when needed |

## 18. Open Questions

1. SMS gateway provider and budget.
2. Object storage provider (R2 vs S3 vs local BD hosting) and hosting region (latency vs data residency).
3. Admin 2FA and IP-allowlist at launch or post-launch?
4. Moderation mode: are new products auto-published for approved shops, or pending approval by default?
5. Default locale: `bn` or `en` for first-time visitors?
6. Domain/subdomain plan confirmed (`vendor.`, `admin.`, `api.`)?
