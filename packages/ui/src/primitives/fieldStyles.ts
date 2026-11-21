import { cva } from 'class-variance-authority'

/** Shared look for text inputs, selects and textareas. `tone` matches the card they sit on. */
export const fieldVariants = cva(
  'w-full rounded-[10px] px-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-subtle focus:ring-2 focus:ring-brand/30',
  {
    variants: {
      tone: { surface: 'bg-surface', white: 'bg-white' },
      size: { md: 'h-12', sm: 'h-10' },
    },
    defaultVariants: { tone: 'surface', size: 'md' },
  },
)
