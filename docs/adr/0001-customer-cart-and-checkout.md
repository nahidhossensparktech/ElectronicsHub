# ADR 0001: Customer cart, checkout and orders

- **Status:** Accepted
- **Date:** 2026-11-21
- **Supersedes:** PRD 13.3 (Shopping cart, centralized checkout, order management, delivery tracking were excluded)

## Context

The PRD described Electronic Hub.bd as a discovery-only marketplace. The approved customer UI reference
(`customer fontend_refarence/Group 1.svg`) includes a multi-shop shopping cart, checkout (delivery method +
bKash/Nagad/card/COD), order confirmation, order history with tracking, and shop coupons.

## Decision

Follow the design. The customer web app ships cart, checkout, orders, order tracking and coupons.
Each shop still fulfils its own items: the cart groups lines by shop and checkout creates one order per shop.

## Consequences

- PRD 13.3, TRD §1 and CLAUDE.md are updated to reflect the new scope.
- Backend needs `cart`, `order`, `payment` and `coupon` modules plus payment-gateway integration (new TRD work).
- `docs/TASKS.md` needs new tasks for these modules before the UI can use real data.
- The current UI uses mock data (`apps/web/src/lib/mock-db`) until those APIs exist.
