import { cn } from '@repo/utils'
import { VerifiedIcon } from './VerifiedIcon'

/** Shop name followed by the verified badge. */
export function ShopName({
  name,
  verified = true,
  className,
  iconSize,
}: {
  name: string
  verified?: boolean
  className?: string
  iconSize?: number
}) {
  return (
    <span className={cn('inline-flex min-w-0 items-center gap-1.5', className)}>
      <span className="truncate">{name}</span>
      {verified ? <VerifiedIcon size={iconSize} /> : null}
    </span>
  )
}
