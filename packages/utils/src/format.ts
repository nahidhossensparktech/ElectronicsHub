const TAKA = '৳'

/** ৳1,240 · ৳2.50 · ৳0.90 — keeps 2 decimals only when the value has a fraction. */
export function formatBDT(amount: number): string {
  const hasFraction = !Number.isInteger(amount)
  return (
    TAKA +
    amount.toLocaleString('en-US', {
      minimumFractionDigits: hasFraction ? 2 : 0,
      maximumFractionDigits: hasFraction ? 2 : 0,
    })
  )
}

/** 12,000 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

/** "Rafi Hasan" -> "RH" */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

/** "500 pcs" style pluralisation for simple English nouns. */
export function plural(count: number, one: string, many = `${one}s`): string {
  return `${formatNumber(count)} ${count === 1 ? one : many}`
}
