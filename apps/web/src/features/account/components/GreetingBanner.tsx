'use client'

import { useEffect, useState } from 'react'
import type { Order } from '@repo/types'
import { LinkButton } from '@repo/ui'

function greeting(hour: number) {
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
}

export function GreetingBanner({ name, activeOrder }: { name: string; activeOrder?: Order }) {
  const [hello, setHello] = useState('Good evening')
  useEffect(() => {
    setHello(greeting(new Date().getHours()))
  }, [])
  const message = activeOrder
    ? `Your order #${activeOrder.id} from ${activeOrder.shopName} is ${activeOrder.status === 'shipped' ? 'on the way — arriving tomorrow' : 'waiting for shop confirmation'}.`
    : 'No active orders. Find your next component in the marketplace.'
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] bg-brand px-8 py-[30px]">
      <div>
        <h2 className="font-display text-2xl leading-8 font-bold text-white">{hello}, {name} 👋</h2>
        <p className="mt-1.5 text-sm text-brand-100">{message}</p>
      </div>
      <LinkButton href={activeOrder ? `/account/orders/${activeOrder.id}` : '/products'} variant="white" size="lg" className="min-w-[117px]">
        {activeOrder ? 'Track Order' : 'Shop now'}
      </LinkButton>
    </section>
  )
}
