'use client'

import { useEffect, useState } from 'react'

function remaining(end: number) {
  const ms = Math.max(0, end - Date.now())
  const s = Math.floor(ms / 1000)
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, '0'))
}

/** Live "Ends in DD HH MM SS" countdown to `hoursFromNow` (stable per page load). */
export function Countdown({ hoursFromNow = 62.6 }: { hoursFromNow?: number }) {
  const [end] = useState(() => Date.now() + hoursFromNow * 3600 * 1000)
  const [parts, setParts] = useState(['02', '14', '36', '09'])
  useEffect(() => {
    setParts(remaining(end))
    const id = setInterval(() => setParts(remaining(end)), 1000)
    return () => clearInterval(id)
  }, [end])
  return (
    <div className="flex items-center gap-2" role="timer" aria-label={`Deals end in ${parts.join(':')}`}>
      <span className="mr-1 text-sm text-muted">Ends in</span>
      {parts.map((part, i) => (
        <span key={i} className="inline-flex size-[46px] items-center justify-center rounded-[10px] bg-ink font-display text-lg font-bold text-white tabular-nums">
          {part}
        </span>
      ))}
    </div>
  )
}
