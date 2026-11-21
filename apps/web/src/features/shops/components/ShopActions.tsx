'use client'

import { Check, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Button, LinkButton } from '@repo/ui'

/** Contact (opens a chat), Follow toggle and Share (copies the link). */
export function ShopActions({ shopSlug }: { shopSlug: string }) {
  const [following, setFollowing] = useState(false)
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      <LinkButton
        href={`/account/messages?shop=${shopSlug}`}
        size="lg"
        className="h-10 sm:h-11 px-4 sm:px-5 text-xs sm:text-sm font-semibold"
      >
        Contact Seller
      </LinkButton>
      <Button
        size="lg"
        variant={following ? 'soft' : 'secondary'}
        className="h-10 sm:h-11 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold"
        onClick={() => setFollowing(!following)}
      >
        {following ? 'Following' : 'Follow'}
      </Button>
      <Button
        size="lg"
        variant="secondary"
        aria-label="Copy shop link"
        className="h-10 sm:h-11 w-10 sm:w-11 px-0"
        onClick={async () => {
          await navigator.clipboard?.writeText(window.location.href).catch(() => {})
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }}
      >
        {copied ? <Check className="size-4 sm:size-[18px] text-success" /> : <Share2 className="size-4 sm:size-[18px]" />}
      </Button>
    </div>
  )
}
