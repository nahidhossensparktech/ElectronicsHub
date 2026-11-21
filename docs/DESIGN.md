# Design System: Electronic Hub.bd

**Version:** 1.0 · **Date:** November 21, 2026 · **Related:** [PRD](./PRD.md), [TRD](./TRD.md)

Tagline: **Every Component. Every Store. One Hub.**

---

## 1. Design Principles

1. **Find fast.** Search is the primary action on every public page. Specs (e.g. `100uF 25V`) must be scannable at a glance.
2. **Trust through clarity.** Price, stock, MOQ, wholesale tiers, shop verification and location are always visible and never hidden behind clicks.
3. **Technical, not cold.** Dense, data-friendly layouts with generous whitespace; a precise "electronics" feel (monospace for part numbers/specs).
4. **Mobile first.** Most Bangladeshi users browse on mid-range Android phones over variable networks. Light pages, touch targets >= 44px.
5. **One system, three surfaces.** Customer site, Vendor dashboard and Admin dashboard share tokens and components (`packages/ui`).
6. **Bangla and English equally.** Layouts must survive longer Bangla strings; fonts must render both scripts well.

---

## 2. Brand & Color Tokens

Defined as CSS variables (via `packages/config-tailwind`), with a dark theme.

> **Source of truth:** the values in `packages/config-tailwind/theme.css` were extracted from the approved customer UI reference and replace the table below where they differ (e.g. brand `#2563EB`, ink `#14213D`). Fonts in the reference: Manrope (headings) and Inter (body).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--brand-600` | `#0B63CE` | `#4C9AFF` | Primary actions, links |
| `--brand-700` | `#0A4FA6` | `#2F7EE0` | Hover/pressed |
| `--brand-50` | `#EAF2FD` | `#0F2540` | Tints, selected rows |
| `--accent-500` | `#F59E0B` | `#FBBF24` | Highlights, wholesale badge, featured |
| `--success-600` | `#15803D` | `#4ADE80` | In stock, approved, verified |
| `--warning-600` | `#B45309` | `#FBBF24` | Low stock, pending |
| `--danger-600` | `#B91C1C` | `#F87171` | Out of stock, rejected, destructive |
| `--neutral-0` | `#FFFFFF` | `#0B1220` | Page background |
| `--neutral-50` | `#F8FAFC` | `#111A2B` | Surface / cards |
| `--neutral-200` | `#E2E8F0` | `#25324A` | Borders |
| `--neutral-600` | `#475569` | `#A8B3C7` | Secondary text |
| `--neutral-900` | `#0F172A` | `#F1F5F9` | Primary text |

Rules:
- Body text contrast >= 4.5:1 (WCAG AA). Never use color alone to convey status; pair with icon/text.
- Status colors map one-to-one to states (see section 7).

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| UI / body (English) | **Inter** | Variable font, `font-display: swap` |
| UI / body (Bangla) | **Hind Siliguri** (fallback: Noto Sans Bengali) | Chosen for readable Bangla at small sizes |
| Part numbers, SKUs, specs | **JetBrains Mono** | Tabular numerals, distinguishes `0/O`, `1/l` |

Scale (rem, mobile -> desktop): `xs 0.75`, `sm 0.875`, `base 1`, `lg 1.125`, `xl 1.25`, `2xl 1.5 -> 1.75`, `3xl 1.875 -> 2.25`, `4xl 2.25 -> 3`.
Line height: 1.5 body, 1.2 headings; Bangla body uses 1.65 to avoid clipped matras.
Prices use tabular numerals, BDT symbol `৳`, formatted per locale (`৳২,৫০০` in bn, `৳2,500` in en).

---

## 4. Spacing, Radius, Elevation

- Spacing: 4px base grid (`1 = 4px`), common steps 4/8/12/16/24/32/48/64.
- Radius: `sm 6px` (inputs/badges), `md 10px` (cards/buttons), `lg 16px` (modals/sheets), `full` (avatars/pills).
- Elevation: 3 levels only. Cards use border + `shadow-sm`; dropdowns/popovers `shadow-md`; modals `shadow-lg`. Avoid heavy shadows (performance on low-end devices).
- Max content width: 1280px (customer), full-width with sidebar (dashboards).

---

## 5. Breakpoints (from PRD 14.4)

| Name | Width | Tailwind |
|---|---|---|
| Small mobile | 320-374 | base |
| Mobile | 375-767 | base / `sm` |
| Tablet | 768-1023 | `md` |
| Desktop | 1024-1439 | `lg` / `xl` |
| Large desktop | 1440+ | `2xl` |

Layouts adapt (reflow, change navigation pattern), not just shrink.

---

## 6. Core Components (`packages/ui`)

Built on shadcn/ui (Radix primitives) + Tailwind. Each component: keyboard accessible, themed, documented in Storybook.

**Primitives:** Button (primary/secondary/ghost/destructive, sizes, loading), IconButton, Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, Slider (price range), Tabs, Badge, Tooltip, Avatar, Skeleton, Toast, Dialog, Sheet (mobile drawer), Dropdown menu, Pagination, Breadcrumb.

**Marketplace components:**
| Component | Content |
|---|---|
| `ProductCard` | Image (4:3, lazy), name, brand, 1-line spec (mono), retail price, "Wholesale from ৳X" badge, stock badge, MOQ, shop name + location, View Details |
| `ShopCard` | Logo, name, verified badge, location, product count, View Shop |
| `PriceTierTable` | Retail and wholesale tiers (qty range, unit price); highlights best tier |
| `StockBadge` | In stock / Low stock / Out of stock + quantity and unit |
| `VerifiedBadge` | Shield icon + tooltip explaining verification |
| `SpecTable` | Key/value technical specs, category-driven |
| `FilterPanel` | Category, brand, price range, availability, location, retail/wholesale; sheet on mobile |
| `SearchBar` | Autosuggest (products, SKUs, brands, shops), recent searches, keyboard nav |
| `ChatBubble` / `ConversationList` / `ProductReferenceCard` | Messaging UI |
| `DataTable` | Sort, filter, pagination, row actions; collapses to card list on mobile |
| `StatCard` | Dashboard metric with delta |
| `StatusPill` | Pending / Approved / Rejected / Suspended / Draft / Published / Inactive |
| `ImageUploader` | Multi-image, reorder, progress, client-side compression |
| `EmptyState` / `ErrorState` | Illustration-light, one clear action |

---

## 7. Status Mapping

| State | Color | Icon |
|---|---|---|
| Approved / Published / In stock / Verified | success | check-circle |
| Pending / Low stock | warning | clock / alert |
| Rejected / Suspended / Out of stock | danger | x-circle / ban |
| Draft / Inactive | neutral | pencil / pause |

---

## 8. Page Layouts

### 8.1 Customer Website (`apps/web`)
- **Header:** logo, global search (dominant), Categories mega-menu, Shops, language toggle (বাংলা/EN), Login/Register or profile + Messages. Mobile: logo + search icon + hamburger; bottom nav (Home, Categories, Shops, Messages, Account).
- **Homepage (PRD 5.1):** search hero -> category grid -> banners -> popular -> recently added -> featured shops -> by location -> recently viewed -> footer.
- **Listing page:** left filter column (desktop) / filter sheet (mobile), sort dropdown, grid 2 cols (mobile) -> 3 (tablet) -> 4 (desktop), paginated.
- **Product details:** image gallery (left), summary + price tiers + stock + CTAs (right), sticky mobile CTA bar (Message / Call vendor), spec table, vendor card, similar products, more from this shop, report.
- **Shop profile:** cover + logo header, tabs (Overview, Products, Categories, About, Contact), in-shop filters. Shareable URL `/shop/{slug}`.
- **Messages:** two-pane on desktop; list -> full-screen chat on mobile.

### 8.2 Vendor Dashboard (`apps/vendor`)
- Left sidebar (collapsible to icons; drawer on mobile): Overview, Products, Inventory, Messages, Shop Profile, Analytics, Settings.
- Overview stat cards (PRD 8.1), recent products, unread messages.
- Product form: stepper/sections (Basic -> Specs (dynamic by category) -> Pricing tiers -> Inventory -> Images -> Visibility). Autosave draft. One-column on mobile.
- Inventory: inline quantity edit, quick "mark out of stock".

### 8.3 Admin Dashboard (`apps/admin`)
- Sidebar: Dashboard, Vendors, Shops, Products, Categories, Content, Reports, Users, Activity log.
- Approval queues with side-panel review (documents preview, approve / reject with reason).
- Dense data tables, saved filters, bulk actions; card view on mobile.

---

## 9. Interaction & Motion

- Motion is functional and short (120-200ms ease-out). Respect `prefers-reduced-motion`.
- Optimistic updates for stock/status toggles with rollback + toast on failure.
- Skeletons for lists/details; never block the page with a full-screen spinner.
- Forms: inline validation on blur, error summary on submit, preserve input on failure.
- Destructive actions require confirmation dialog with consequence text.

---

## 10. Imagery & Iconography

- Icons: **Lucide** (consistent 1.5px stroke).
- Product images: 4:3 and 1:1 supported; WebP/AVIF via `next/image`; blurred placeholder; alt text = product name + key spec.
- Fallback placeholder per category for products without images.
- Shop logos 1:1 (min 256px), cover 3:1 (min 1500x500).

---

## 11. Accessibility

- WCAG 2.1 AA target. Visible focus ring (2px brand, offset 2px) on all interactive elements.
- Full keyboard operability (menus, combobox, dialogs trap focus, Esc closes).
- Labels on every input; errors announced with `aria-live`.
- Touch targets >= 44x44px; spacing between adjacent targets >= 8px.
- Language attribute set per locale (`lang="bn"`/`"en"`).

---

## 12. Localization

- Locales: `bn` (default for Bangladesh audience, configurable) and `en`, URL-prefixed (`/bn/...`, `/en/...`).
- Numerals: Bangla digits in `bn` for display; inputs accept both, stored as normalized numbers.
- Currency: BDT `৳`; dates in local format; phone format `+880 1XXX-XXXXXX`.
- Product/shop user-generated content is shown as entered (no auto-translation in MVP).

---

## 13. Design Deliverables & Process

1. Figma file: foundations (tokens), components, then page templates for the three apps.
2. Tokens exported to `packages/config-tailwind` (single source of truth).
3. Component library documented in Storybook; visual regression via Chromatic or Playwright snapshots (later phase).
4. Every new page uses existing components; new components require entry in this document.
