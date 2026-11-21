# Folder Architecture: Electronic Hub.bd (Frontend)

**Version:** 1.0 · **Date:** November 21, 2026 · **Related:** [TRD](./TRD.md), [DESIGN](./DESIGN.md)

Approach: **Turborepo + pnpm monorepo**, three Next.js apps (App Router, TypeScript), shared packages, feature-based structure inside each app. The Go backend lives in a separate repository (`electronichub-api`, see section 7).

---

## 1. Why this structure

- Customer, Vendor and Admin have different SEO needs, bundles, security boundaries and deploy targets.
- UI, types, API client and i18n are shared, so nothing is duplicated.
- Feature folders keep business logic together and make the codebase scale as the team grows.
- Start small: `web` + `vendor` first, add `admin` when needed. The structure doesn't change.

## 2. Repository Root

```
ElectronicsHub/
├─ apps/
│  ├─ web/                  # Customer website            electronichub.bd
│  ├─ vendor/               # Vendor dashboard            vendor.electronichub.bd
│  └─ admin/                # Admin dashboard             admin.electronichub.bd
├─ packages/
│  ├─ ui/                   # Design system components (shadcn/ui based)
│  ├─ api-client/           # Typed API client generated from OpenAPI
│  ├─ types/                # Shared TS types + zod schemas
│  ├─ i18n/                 # bn/en messages, formatters (BDT, dates, numerals)
│  ├─ utils/                # Pure helpers (price tiers, slugify, etc.)
│  ├─ config-ts/            # Shared tsconfig presets
│  ├─ config-eslint/        # Shared ESLint config
│  └─ config-tailwind/      # Design tokens + Tailwind preset
├─ docs/
│  ├─ PRD.md
│  ├─ TRD.md
│  ├─ DESIGN.md
│  ├─ FOLDER_ARCHITECTURE.md
│  ├─ TASKS.md
│  └─ adr/                  # Architecture Decision Records (0001-....md)
├─ .github/workflows/       # CI (lint, test, build)
├─ .env.example
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml       # Local services (when running backend locally)
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ README.md
```

## 3. Inside an App: `apps/web`

```
apps/web/
├─ public/                  # static assets, favicons, fonts (if self-hosted)
├─ src/
│  ├─ app/                  # ROUTING ONLY: thin page/layout files
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx
│  │  │  ├─ (home)/page.tsx
│  │  │  ├─ products/
│  │  │  │  ├─ page.tsx                    # listing + filters
│  │  │  │  └─ [slug]/page.tsx             # product details
│  │  │  ├─ categories/[slug]/page.tsx
│  │  │  ├─ shops/
│  │  │  │  ├─ page.tsx                    # shop directory
│  │  │  │  └─ [shopSlug]/
│  │  │  │     ├─ layout.tsx               # shop header + tabs
│  │  │  │     ├─ page.tsx                 # overview
│  │  │  │     ├─ products/page.tsx
│  │  │  │     ├─ categories/page.tsx
│  │  │  │     ├─ about/page.tsx
│  │  │  │     └─ contact/page.tsx
│  │  │  ├─ search/page.tsx
│  │  │  ├─ (auth)/{login,register,verify-otp,forgot-password,reset-password}/page.tsx
│  │  │  ├─ account/                       # profile (auth required)
│  │  │  ├─ messages/{page.tsx,[conversationId]/page.tsx}
│  │  │  └─ (content)/{about,contact,terms,privacy,faq,help}/page.tsx
│  │  ├─ api/                               # only if a Next route handler is needed (e.g. auth cookie bridge)
│  │  ├─ sitemap.ts
│  │  ├─ robots.ts
│  │  ├─ not-found.tsx
│  │  └─ error.tsx
│  ├─ features/             # BUSINESS LOGIC lives here
│  │  ├─ products/          # components/, hooks/, api/, schemas/, types.ts, index.ts
│  │  ├─ shops/
│  │  ├─ categories/
│  │  ├─ search/            # SearchBar, FilterPanel, query-string helpers
│  │  ├─ auth/              # forms, session helpers, OTP flow
│  │  ├─ messaging/         # WS client, ConversationList, ChatWindow
│  │  ├─ notifications/
│  │  └─ home/              # homepage sections
│  ├─ components/           # app-level shared UI (Header, Footer, MobileNav, LocaleSwitcher)
│  ├─ lib/                  # env.ts (zod), fetcher.ts, auth.ts, seo.ts, constants.ts
│  ├─ hooks/                # generic hooks (useDebounce, useMediaQuery)
│  ├─ i18n/                 # next-intl routing + request config
│  ├─ styles/globals.css
│  └─ middleware.ts         # locale + auth/role guard
├─ tests/                   # Playwright E2E (or top-level e2e/)
├─ next.config.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ Dockerfile
└─ package.json
```

### 3.1 `apps/vendor` (feature set)

```
src/features/
├─ dashboard/       # overview stat cards
├─ shop-profile/    # edit shop, hours, social links, activate/deactivate
├─ products/        # list table, product form (stepper), image uploader, price tiers editor
├─ inventory/       # quick stock edit, low-stock list
├─ messaging/       # inbox + chat
├─ analytics/       # product/shop views, inquiries
├─ onboarding/      # register, create shop, pending-approval screen
└─ notifications/
```
Routes: `/dashboard`, `/products`, `/products/new`, `/products/[id]/edit`, `/inventory`, `/messages`, `/shop`, `/analytics`, `/settings`, `/onboarding/*`.

### 3.2 `apps/admin` (feature set)

```
src/features/
├─ dashboard/
├─ vendors/         # list, detail, documents review, approve/reject/suspend
├─ shops/           # approval queue, edit, feature, badges
├─ products/        # moderation queue, feature, remove
├─ categories/      # categories, brands, units, attribute/spec templates
├─ content/         # banners, featured, pages (About, Terms...), FAQ
├─ reports/         # reported products/shops/users/messages
├─ users/           # customers management
├─ activity-log/
└─ auth/            # admin login (+ 2FA)
```

## 4. Shared Packages

```
packages/ui/
├─ src/
│  ├─ primitives/        # Button, Input, Select, Dialog, Sheet, Tabs, Toast...
│  ├─ marketplace/       # ProductCard, ShopCard, PriceTierTable, StockBadge, StatusPill...
│  ├─ data/              # DataTable, Pagination, StatCard
│  ├─ hooks/
│  └─ index.ts           # explicit exports only
├─ package.json          # name: @repo/ui
└─ .storybook/

packages/api-client/
├─ src/
│  ├─ generated/         # openapi-typescript output (do not edit)
│  ├─ client.ts          # fetch wrapper (cookies, errors, retries)
│  ├─ endpoints/         # products.ts, shops.ts, auth.ts, messages.ts, admin.ts ...
│  └─ index.ts
└─ scripts/generate.ts   # pulls openapi.json from backend

packages/types/          # zod schemas + inferred types shared by forms and API
packages/i18n/           # messages/{bn,en}/*.json, formatters (formatBDT, formatDate, toBanglaDigits)
packages/utils/          # pure functions, unit tested
packages/config-*/       # tsconfig, eslint, tailwind preset (tokens from DESIGN.md)
```

Package names use the `@repo/*` scope (e.g. `@repo/ui`, `@repo/api-client`).

## 5. Rules & Conventions

1. `app/` contains routing, metadata and data fetching only. UI and logic go in `features/`.
2. A feature exposes a public API through its `index.ts`. Other features import only from there (no deep imports).
3. Dependency direction: `app` -> `features` -> `components`/`lib` -> `packages`. Packages never import from apps.
4. Features must not import other apps' code. Shared code moves to `packages/` once a second app needs it.
5. Server Components by default; add `"use client"` only for interactive leaves.
6. All HTTP goes through `@repo/api-client`; no raw `fetch` in components.
7. Forms validate with zod schemas from `@repo/types`; the same schemas mirror backend validation rules.
8. Env access only via `lib/env.ts` (zod-validated). `NEXT_PUBLIC_*` only for non-secret values.
9. Naming: folders `kebab-case`; React components `PascalCase.tsx`; hooks `useThing.ts`; zod schemas `thing.schema.ts`; tests next to source as `*.test.ts(x)`.
10. Each feature folder structure: `components/`, `hooks/`, `api/` (query/mutation wrappers), `schemas/`, `types.ts`, `index.ts`.
11. No barrel-everything: only `index.ts` at feature/package root.
12. Absolute imports via `@/` (app `src`) and `@repo/*` (packages).
13. i18n: no hardcoded UI strings; keys live in `packages/i18n` (shared) or the app's own messages.
14. Every new ADR-worthy decision gets `docs/adr/NNNN-title.md`.

## 6. Tooling

| Concern | Tool |
|---|---|
| Package manager / workspaces | pnpm |
| Task runner / cache | Turborepo (`build`, `dev`, `lint`, `typecheck`, `test`) |
| Lint / format | ESLint + Prettier, `eslint-plugin-boundaries` to enforce rule 2-4 |
| Git hooks | Husky + lint-staged + commitlint (conventional commits) |
| Tests | Vitest, Testing Library, Playwright |
| Component docs | Storybook (`packages/ui`) |
| Versioning | Changesets (optional, if packages are ever published) |
| CI | GitHub Actions with Turborepo remote cache |

Dev ports: web `3000`, vendor `3001`, admin `3002`.

## 7. Backend Repository (reference)

Separate repo `electronichub-api` (Go + Gin), modular monolith:

```
electronichub-api/
├─ cmd/api/main.go
├─ cmd/worker/main.go            # background jobs (asynq)
├─ internal/
│  ├─ platform/                  # config, db, redis, logger, storage, meili, smsprovider, middleware
│  ├─ auth/  user/  vendor/  shop/  product/  category/
│  ├─ inventory/  search/  messaging/  notification/
│  ├─ admin/  report/  cms/  media/
│  │   └─ each: handler.go  service.go  repository.go  model.go  dto.go  routes.go  *_test.go
├─ migrations/                   # golang-migrate SQL files
├─ api/openapi/                  # generated swagger (consumed by api-client)
├─ deployments/{docker,nginx}/
├─ Makefile
└─ go.mod
```

## 8. Growth Path

- Add `apps/admin` when admin work begins; nothing else changes.
- If a feature outgrows an app (e.g. messaging UI used by `web` and `vendor`), move its UI to `packages/messaging` and keep app-specific wiring in the apps.
- Mobile apps (future): reuse `packages/api-client`, `packages/types`, `packages/utils`.
