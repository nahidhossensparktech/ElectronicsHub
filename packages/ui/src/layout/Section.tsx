import type { ComponentProps } from 'react'
import { cn } from '@repo/utils'
import { Container } from '../primitives/Container'

export interface SectionProps extends ComponentProps<'section'> {
  tone?: 'white' | 'canvas'
  containerClassName?: string
}

/** Full-width band with a centered container. Default vertical rhythm is 64px. */
export function Section({ tone = 'white', className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(tone === 'canvas' ? 'bg-canvas' : 'bg-white', 'py-16', className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
