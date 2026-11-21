/**
 * Mock session until auth (P1-08 / P1-12) lands.
 * The design shows a guest header on browse pages and a signed-in header on cart/checkout.
 */
export interface SessionUser {
  firstName: string
  name: string
  initials: string
  role: 'customer'
}

export const demoUser: SessionUser = { firstName: 'Nahid', name: 'Nahid Hossen', initials: 'NH', role: 'customer' }
