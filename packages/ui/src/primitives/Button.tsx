import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'

export const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-white hover:bg-brand-700',
        dark: 'bg-ink text-white hover:bg-ink-800',
        white: 'bg-white text-ink hover:bg-surface',
        outline: 'bg-white text-brand hover:bg-brand-50',
        soft: 'bg-brand-50 text-brand hover:bg-brand-100',
        secondary: 'bg-surface text-ink hover:bg-line',
        danger: 'bg-danger-50 text-danger hover:bg-red-100',
        ghost: 'text-brand hover:text-brand-700',
      },
      size: {
        xs: 'h-8 rounded-lg px-3 text-[13px]',
        sm: 'h-[34px] rounded-[10px] px-3.5 text-[13px]',
        md: 'h-10 rounded-[10px] px-4 text-sm',
        lg: 'h-11 rounded-[10px] px-5 text-sm',
        xl: 'h-[52px] rounded-[10px] px-6 text-[15px]',
      },
      block: { true: 'w-full' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type Variants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ComponentProps<'button'>, Variants {}

export function Button({ className, variant, size, block, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size, block }), className)} {...props} />
  )
}

export interface LinkButtonProps extends ComponentProps<typeof Link>, Variants {}

/** A Next.js link styled as a button. */
export function LinkButton({ className, variant, size, block, ...props }: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ variant, size, block }), className)} {...props} />
}
