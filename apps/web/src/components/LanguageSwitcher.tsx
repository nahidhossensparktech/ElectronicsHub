'use client'

import { Globe } from 'lucide-react'
import { cn } from '@repo/utils'
import { useTranslation } from '@/lib/i18n'

export function LanguageSwitcher({
  className,
  compact,
  theme = 'light',
}: {
  className?: string
  compact?: boolean
  theme?: 'light' | 'dark'
}) {
  const { language, setLanguage } = useTranslation()
  const dark = theme === 'dark'

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        'inline-flex items-center rounded-xl border p-0.5 text-xs font-semibold shadow-2xs',
        dark ? 'border-ink-700 bg-ink-900/90' : 'border-line/70 bg-surface/80',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all',
          language === 'en'
            ? dark
              ? 'bg-brand text-white shadow-xs'
              : 'bg-white text-brand shadow-xs'
            : dark
              ? 'text-subtle hover:text-white'
              : 'text-muted hover:text-ink',
        )}
      >
        {!compact ? <Globe className="size-3.5" /> : null}
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={cn(
          'flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all',
          language === 'bn'
            ? dark
              ? 'bg-brand text-white shadow-xs'
              : 'bg-white text-brand shadow-xs'
            : dark
              ? 'text-subtle hover:text-white'
              : 'text-muted hover:text-ink',
        )}
      >
        <span>বাংলা</span>
      </button>
    </div>
  )
}
