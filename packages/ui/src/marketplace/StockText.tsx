import { cn, formatNumber } from '@repo/utils'

/** "140 in stock" (green) or "Out of stock" (red). */
export function StockText({ stock, className }: { stock: number; className?: string }) {
  return (
    <span className={cn('text-xs font-medium whitespace-nowrap', stock > 0 ? 'text-success' : 'text-danger', className)}>
      {stock > 0 ? `${formatNumber(stock)} in stock` : 'Out of stock'}
    </span>
  )
}
