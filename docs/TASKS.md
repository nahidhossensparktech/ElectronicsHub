# Task Breakdown: Electronic Hub.bd

**Version:** 1.0 · **Date:** November 21, 2026 · **Related:** [PRD](./PRD.md), [TRD](./TRD.md), [DESIGN](./DESIGN.md), [FOLDER_ARCHITECTURE](./FOLDER_ARCHITECTURE.md)

Phases mirror PRD section 18. Task IDs are stable references (`P1-03`). Tags: **[FE]** frontend, **[BE]** backend, **[INF]** infra/devops, **[DS]** design, **[QA]** testing. Priority: P0 (must for MVP), P1 (should), P2 (nice).
Status legend: `[ ]` todo, `[~]` in progress, `[x]` done.
When starting or finishing a task add the owner and date: `- [~] P0-01 ... (P0) @nahid` then `- [x] P0-01 ... (P0) @nahid 2026-11-25`. The progress page ([PROGRESS](./PROGRESS.md)) is generated from these lines.

---

## Phase 0: Setup & Foundations

**Prerequisites:** install Node LTS + pnpm on dev machine (currently missing).

- [ ] P0-01 [INF] Install Node LTS, pnpm, Docker. (P0)
- [ ] P0-02 [INF] Initialize git repo, `.gitignore`, `README.md`, conventional commits. (P0)
- [ ] P0-03 [FE] Scaffold Turborepo + pnpm workspace per FOLDER_ARCHITECTURE (`apps/web`, `apps/vendor`, `packages/*`). (P0)
- [ ] P0-04 [FE] Shared configs: `config-ts`, `config-eslint` (with boundaries rules), `config-tailwind`, Prettier. (P0)
- [ ] P0-05 [FE] Husky + lint-staged + commitlint. (P1)
- [ ] P0-06 [INF] GitHub Actions: lint, typecheck, test, build with Turbo cache. (P0)
- [ ] P0-07 [FE] `lib/env.ts` zod env validation + `.env.example`. (P0)
- [ ] P0-08 [INF] Create backend repo `electronichub-api` skeleton (Go, Gin, config, logger, health endpoints, Makefile). (P0)
- [ ] P0-09 [INF] `docker-compose.yml` for Postgres, Redis, Meilisearch, MinIO. (P0)
- [ ] P0-10 [BE] Migration tooling (golang-migrate) + baseline migration. (P0)
- [ ] P0-11 [BE] OpenAPI generation (swaggo) + `packages/api-client` generate script. (P0)
- [ ] P0-12 [DS] Resolve TRD open questions (SMS provider, storage provider, default locale, domains). (P0)

## Phase 1: Platform Foundation (PRD Phase 1)

### Design
- [ ] P1-01 [DS] Figma foundations: color/typography/spacing tokens, icon set. (P0)
- [ ] P1-02 [DS] Core component designs + page templates for auth, vendor onboarding, dashboards. (P0)

### Shared UI
- [ ] P1-03 [FE] `packages/ui` primitives (Button, Input, Select, Dialog, Sheet, Toast, Tabs, Badge, Skeleton...). (P0)
- [ ] P1-04 [FE] Storybook for `packages/ui`. (P1)
- [ ] P1-05 [FE] `packages/i18n`: bn/en setup, formatters (BDT, dates, Bangla digits), locale routing in apps. (P0)
- [ ] P1-06 [FE] Fonts (Inter, Hind Siliguri, JetBrains Mono) with `next/font`, dark theme tokens. (P1)

### Auth & Users
- [ ] P1-07 [BE] DB: users, user_profiles, otp_verifications, refresh_tokens. (P0)
- [ ] P1-08 [BE] Auth module: register (phone/email), OTP send/verify, login, logout, refresh rotation, forgot/reset password. (P0)
- [ ] P1-09 [BE] `SMSProvider` interface + chosen provider + dev mock. (P0)
- [ ] P1-10 [BE] RBAC middleware (customer/vendor/admin), rate limiting (Redis), password hashing. (P0)
- [ ] P1-11 [BE] User profile endpoints (get/update). (P0)
- [ ] P1-12 [FE] Auth pages in `web`: register, OTP verify, login, forgot/reset password, session helpers, `middleware.ts` guard. (P0)
- [ ] P1-13 [FE] Google sign-in. (P2)
- [ ] P1-14 [FE] Account/profile page. (P1)

### Vendor onboarding & shop creation
- [ ] P1-15 [BE] DB: vendor_profiles, vendor_documents, shops, shop_settings (status enum, slug, history). (P0)
- [ ] P1-16 [BE] Media module: presigned upload, private bucket for documents, image processing worker. (P0)
- [ ] P1-17 [BE] Vendor/shop endpoints: register vendor, create/update shop, submit for approval, status. (P0)
- [ ] P1-18 [FE] `vendor` app shell: login, sidebar layout (collapsible/mobile drawer), route guard. (P0)
- [ ] P1-19 [FE] Vendor onboarding: register, create-shop form (logo, cover, docs), pending-approval screen. (P0)
- [ ] P1-20 [BE] Admin: list pending shops, approve/reject/suspend with reason, admin activity log. (P0)
- [ ] P1-21 [FE] `admin` app shell + admin login + shop/vendor approval queue (basic). (P0)
- [ ] P1-22 [BE] Notifications v0: shop status change -> in-app + email to vendor. (P1)

### Phase 1 QA
- [ ] P1-23 [QA] E2E: vendor registers -> creates shop -> admin approves -> vendor reaches dashboard. (P0)
- [ ] P1-24 [QA] Authz tests (IDOR, role checks) for auth/vendor/admin endpoints. (P0)

## Phase 2: Product Marketplace (PRD Phase 2)

### Catalog structure
- [ ] P2-01 [BE] DB: categories, brands, units, product_attributes (category spec templates). (P0)
- [ ] P2-02 [BE] Category/brand/attribute admin endpoints + public read endpoints (cached). (P0)
- [ ] P2-03 [FE] Admin: category tree, brands, units, spec-template management. (P0)
- [ ] P2-04 [BE] Seed data: electronics categories (resistor, capacitor, battery, IC, sensor, microcontroller...) + spec templates. (P0)

### Products
- [ ] P2-05 [BE] DB: products, product_images, product_attribute_values, product_prices, bulk_price_tiers, inventories, stock_histories. (P0)
- [ ] P2-06 [BE] Product CRUD (vendor-scoped), status workflow (draft/pending/published/inactive/rejected), tier validation (no overlaps), slugging. (P0)
- [ ] P2-07 [BE] Inventory endpoints: set/adjust quantity, mark out of stock, history, low-stock flag. (P0)
- [ ] P2-08 [FE] Vendor: products list (DataTable, filters, activate/deactivate, delete). (P0)
- [ ] P2-09 [FE] Vendor: product form (sections), dynamic specs by category, price tiers editor, inventory, multi-image uploader with reorder. (P0)
- [ ] P2-10 [FE] Vendor: inventory page with inline quantity edit. (P1)
- [ ] P2-11 [BE+FE] Admin product moderation queue: approve/reject/edit/remove, feature product. (P0)

### Search & discovery
- [ ] P2-12 [BE] Meilisearch setup: product index schema, synonyms, tokenizer config for `100uF`-style queries. (P0)
- [ ] P2-13 [BE] Outbox + worker for index sync; reindex command; de-index on shop suspension. (P0)
- [ ] P2-14 [BE] Search API: query, filters (category, brand, price, availability, location, shop, retail/wholesale), sort, pagination, autosuggest. (P0)
- [ ] P2-15 [FE] `packages/ui` marketplace components: ProductCard, StockBadge, PriceTierTable, SpecTable, FilterPanel, SearchBar, Pagination. (P0)
- [ ] P2-16 [FE] `web`: product listing/search page (filters sync with URL, mobile filter sheet). (P0)
- [ ] P2-17 [FE] `web`: product details page (gallery, tiers, specs, vendor card, similar products, more from shop, share, report). (P0)
- [ ] P2-18 [FE] `web`: category pages + category navigation (mega menu / mobile). (P0)
- [ ] P2-19 [BE] Report product endpoint; view-event tracking beacon. (P1)
- [ ] P2-20 [FE] SEO: metadata, JSON-LD Product, sitemap, canonical, hreflang. (P0)

### Phase 2 QA
- [ ] P2-21 [QA] Unit tests: price tier validation, stock status, status transitions. (P0)
- [ ] P2-22 [QA] E2E: vendor adds product -> approved -> appears in search -> detail page. (P0)
- [ ] P2-23 [QA] Search relevance test set (30+ real electronics queries, see PRD section 11). (P1)

## Phase 3: Shop Discovery (PRD Phase 3)

- [ ] P3-01 [BE] Public shop endpoints: directory (filters: district, area, category, verified, newest), profile by slug, shop products. (P0)
- [ ] P3-02 [BE] Shop index in Meilisearch (shop search, product counts). (P0)
- [ ] P3-03 [FE] `web`: shop directory page with filters/sorting. (P0)
- [ ] P3-04 [FE] `web`: shop profile layout (cover, logo, badge, tabs: overview/products/categories/about/contact), shareable URL, OG image. (P0)
- [ ] P3-05 [FE] In-shop product filtering and sorting. (P0)
- [ ] P3-06 [FE] Vendor: shop profile management (hours, socials, activate/deactivate); sensitive change -> re-verification flag. (P0)
- [ ] P3-07 [BE+FE] Admin: feature shops, verification badges, edit shop. (P1)
- [ ] P3-08 [FE] Homepage sections: banners, featured categories, popular, recent, featured shops, by location, recently viewed. (P0)
- [ ] P3-09 [BE] Slug history + redirects for renamed shops. (P1)
- [ ] P3-10 [QA] E2E: browse directory -> open shop -> filter products -> product -> contact info visible. (P0)

## Phase 4: Messaging (PRD Phase 4)

- [ ] P4-01 [BE] DB: conversations, conversation_participants, messages, message_attachments, notifications, notification_preferences. (P0)
- [ ] P4-02 [BE] WebSocket hub with Redis pub/sub, auth ticket, heartbeat, reconnect semantics, dedupe (`client_msg_id`). (P0)
- [ ] P4-03 [BE] REST: list conversations, history (paginated), start conversation (with product reference), mark read, block/report. (P0)
- [ ] P4-04 [BE] Image attachments (presigned, type/size checks). (P0)
- [ ] P4-05 [BE] Notification service: in-app (WS push), email queue, Web Push (opt-in). (P0)
- [ ] P4-06 [FE] `@repo/ui` chat components; `web` messages: conversation list, chat window, product reference card, mobile full-screen chat. (P0)
- [ ] P4-07 [FE] "Message Vendor" CTA on product/shop pages (auth gate -> resume). (P0)
- [ ] P4-08 [FE] Vendor inbox + chat, unread counters, view related product. (P0)
- [ ] P4-09 [FE] Notification bell/center in all apps; browser notification permission flow. (P1)
- [ ] P4-10 [QA] E2E: customer messages vendor from product -> vendor receives real-time -> replies -> read status. (P0)
- [ ] P4-11 [QA] Load test WS (2k concurrent connections) with k6. (P1)

## Phase 5: Administration & Launch (PRD Phase 5)

### Admin completeness
- [ ] P5-01 [BE+FE] Admin dashboard stats (PRD 10.1). (P0)
- [ ] P5-02 [BE+FE] Customer management: search, view, block/unblock. (P0)
- [ ] P5-03 [BE+FE] Vendor management: documents review, approve/reject/suspend/reactivate. (P0)
- [ ] P5-04 [BE+FE] Reports & moderation: reported products/shops/users/messages, actions, audit. (P0)
- [ ] P5-05 [BE+FE] CMS: banners, featured products/shops, static pages (About, Terms, Privacy, FAQ, Help). (P0)
- [ ] P5-06 [BE+FE] Admin activity log viewer. (P1)
- [ ] P5-07 [BE] Admin 2FA (TOTP) and optional IP allowlist. (P1)

### Vendor analytics
- [ ] P5-08 [BE] Aggregation worker: product/shop views and inquiry counts (daily counters). (P0)
- [ ] P5-09 [FE] Vendor dashboard overview + analytics page (PRD 8.1). (P0)
- [ ] P5-10 [BE] Low-stock reminders. (P1)

### Hardening & launch
- [ ] P5-11 [QA] Responsive testing on all breakpoints (320-1440+) for three apps; real Android devices. (P0)
- [ ] P5-12 [QA] Accessibility audit (axe, keyboard, screen reader spot checks). (P0)
- [ ] P5-13 [QA] Security testing: OWASP ZAP baseline, authz review, upload tests, rate-limit tests, dependency audit. (P0)
- [ ] P5-14 [QA] Performance: Lighthouse CI budgets (LCP/INP/CLS), k6 API/search tests, DB query review (`EXPLAIN`). (P0)
- [ ] P5-15 [INF] Production infra: Docker images, Nginx, TLS, domains, secrets, storage/CDN. (P0)
- [ ] P5-16 [INF] Observability: Sentry (FE+BE), structured logs, Prometheus/Grafana, uptime checks. (P0)
- [ ] P5-17 [INF] Backups: Postgres daily + PITR, restore drill, storage versioning. (P0)
- [ ] P5-18 [INF] Staging environment + release process (migrations first, rollback plan). (P0)
- [ ] P5-19 [FE] Legal/content: Terms, Privacy, vendor guidelines, cookie consent. (P0)
- [ ] P5-20 [QA] UAT with pilot vendors (5-10 shops), bug triage, MVP acceptance checklist (PRD section 20). (P0)
- [ ] P5-21 [INF] Production deployment + go-live checklist. (P0)

## Backlog (post-MVP, PRD section 19)

- [ ] B-01 Bulk product import via Excel/CSV. (P1)
- [ ] B-02 Shop and product ratings/reviews. (P1)
- [ ] B-03 Advanced product comparison. (P2)
- [ ] B-04 RFQ (Request for Quotation) and B2B sourcing. (P1)
- [ ] B-05 Datasheet library. (P2)
- [ ] B-06 AI-assisted component search / similar components. (P2)
- [ ] B-07 Advanced vendor analytics. (P2)
- [ ] B-08 Premium vendor subscriptions and sponsored placement (monetization). (P1)
- [ ] B-09 Multiple shops per vendor (drop `vendor_id` unique constraint, add shop switcher). (P2)
- [ ] B-10 Native Android/iOS apps (reuse api-client/types). (P2)

---

## Suggested Order of Work (first 4 weeks)

| Week | Focus |
|---|---|
| 1 | P0-01..P0-12, P1-01, P1-03, P1-05 (setup, tokens, UI base) |
| 2 | P1-07..P1-12 (auth end to end) |
| 3 | P1-15..P1-21 (vendor onboarding + admin approval) |
| 4 | P1-23/24 QA, then P2-01..P2-04 (catalog structure) |

## Definition of Done (every task)

1. Code merged via PR with review; lint, typecheck and tests green.
2. Responsive on mobile/tablet/desktop; keyboard accessible; bn/en strings present.
3. Server-side validation and authorization verified (no client-only checks).
4. API changes reflected in OpenAPI and `api-client` regenerated.
5. Tests added for new business rules; E2E updated if a user flow changed.
6. Docs updated (this file's status, ADR if a decision was made).
