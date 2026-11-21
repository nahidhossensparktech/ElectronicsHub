# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Electronic Hub.bd** is a multi-vendor electronics components marketplace for Bangladesh. It is a product discovery and vendor connection platform with three roles: Customer, Vendor, Admin.

Customers can use a multi-shop cart, checkout, orders and tracking; each shop fulfils its own order ([ADR 0001](docs/adr/0001-customer-cart-and-checkout.md), which supersedes PRD 13.3).

Tagline: *Every Component. Every Store. One Hub.*

## Source of truth

Read the relevant doc before making decisions. If code and docs disagree, ask or propose an ADR in `docs/adr/`.

| Doc | Use for |
|---|---|
| [docs/PRD.md](docs/PRD.md) | Product scope, roles, features |
| [docs/TRD.md](docs/TRD.md) | Tech stack, architecture, API, auth, security |
| [docs/DESIGN.md](docs/DESIGN.md) | Design tokens, components, UX principles |
| [docs/FOLDER_ARCHITECTURE.md](docs/FOLDER_ARCHITECTURE.md) | Repo layout and conventions |
| [docs/TASKS.md](docs/TASKS.md) | Task breakdown (IDs like `P1-03`) and status |

## Tech stack

- **Frontend:** Next.js (App Router), React, TypeScript (strict), Tailwind CSS, shadcn/ui, TanStack Query, react-hook-form + zod, next-intl (`bn`, `en`)
- **Monorepo:** Turborepo + pnpm. Apps: `apps/web`, `apps/vendor`, `apps/admin`. Shared: `packages/*`
- **Backend:** Go + Gin modular monolith, in a separate repo `electronichub-api`
- **Data:** PostgreSQL 16, Redis, Meilisearch, S3-compatible storage
- **Contract:** OpenAPI 3 (swaggo). `packages/api-client` is generated from it. Do not hand-edit generated code.

## Commands

```bash
pnpm install          # install deps
pnpm dev              # run all apps (turbo)
pnpm --filter web dev # customer site on http://localhost:3000
pnpm typecheck        # tsc --noEmit in every package
pnpm build            # production build
```

Lint and test scripts are not set up yet (P0-04, P0-05).

## Customer web app (`apps/web`)

- Built pixel-for-pixel from `customer fontend_refarence/Group 1.svg` (30 screens at 1440px).
- Route groups: `(public)` guest header + footer (`(nav)` is just a grouping folder), `(member)` signed-in header (cart/checkout), `account/` sidebar layout. There is no secondary nav bar.
- Pages stay thin; UI lives in `src/features/*` (each with `components/`, `api/`, `index.ts`). Import features only through their `index.ts`.
- **Catalog data** (products, shops, categories) lives in `src/lib/mock-db` and is queried on the server through feature `api/` functions (`features/catalog/api/query.ts` does filter/sort/paginate). Listing state lives in the URL (`?category=&brand=&min=&max=&stock=&district=&sort=&view=&page=`). Swap these functions for `@repo/api-client` later and keep the signatures.
- **User data** (cart, coupon, wishlist, orders, addresses, profile, messages, notifications, settings) lives in a small client store, `src/lib/store`, persisted to `localStorage` (`eh-store-v1`). Read with `useAppStore(selector)` and select raw slices only (derive with `useMemo`). Change it only through the actions in `lib/store/actions.ts`.
- Don't use `useSearchParams` in client components. Server pages pass `searchParams` down as props (see `hooks/useUrlParams.ts`); `useSearchParams` inside Suspense left components un-hydrated on dynamic pages.
- Shared components live in `packages/ui` (primitives, layout, data, marketplace). Check there before writing a new one.
- Product illustrations in `public/products/*.svg` and the logos were extracted from the reference SVG.
- i18n (next-intl, `[locale]` routes) is not wired yet; strings are English for now.

## Conventions

- **TypeScript:** strict mode, no `any`, no unchecked non-null assertions. Validate external input with zod; share schemas via `packages/types`.
- **Structure:** feature-based folders inside each app. Reusable UI goes in `packages/ui`, pure helpers in `packages/utils`. Respect ESLint boundary rules; apps never import from other apps.
- **Backend layering:** handler → service → repository. No business logic in handlers, no HTTP types in services.
- **Styling:** use design tokens from `packages/config-tailwind`. Never hardcode colors, spacing or fonts.
- **i18n:** every user-facing string should go through next-intl (not wired yet). Support both Bangla and English, and expect longer Bangla strings. Format money as BDT and use locale-aware dates and numerals.
- **Mobile first:** touch targets of at least 44px, light pages, usable on mid-range Android over slow networks.
- **Part numbers and specs:** render in monospace (e.g. `100uF 25V`).
- **Accessibility:** semantic HTML, keyboard support, visible focus, sufficient contrast in light and dark themes.
- **Env vars:** validated in `lib/env.ts`. Add new ones to `.env.example`. Never commit secrets.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`...). Keep commits small and focused.

## Workflow

1. Find the task in `docs/TASKS.md` and check its prerequisites.
2. Read the related PRD/TRD/DESIGN sections.
3. Implement the smallest change that satisfies the task. Don't add scope.
4. Run lint, typecheck and tests before declaring work done.
5. Mark the task status in `docs/TASKS.md`: `[~] ... @owner` in progress, `[x] ... @owner YYYY-MM-DD` done.
6. Never edit `docs/PROGRESS.md` by hand. A hook regenerates it whenever `docs/TASKS.md` changes (`python3 scripts/task_progress.py` to run manually).

## Docs site (MkDocs)

```bash
pip install -r requirements-docs.txt
mkdocs serve    # live preview at http://127.0.0.1:8000
mkdocs build
```

Hooks live in `.claude/settings.json`: on session start a task summary is shown, and editing `docs/TASKS.md` regenerates the progress page.

## Rules

- Ask before adding a major dependency, changing the architecture, or deviating from the docs.
- Don't edit generated files or lockfiles by hand.
- Don't run destructive commands (force push, `rm -rf`, dropping databases) without confirmation.
- Prefer editing existing files over creating new ones.
- Report test or build failures honestly, with the output.
