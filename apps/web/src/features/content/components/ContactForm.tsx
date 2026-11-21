'use client'

import { CircleCheck } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Button, Field, Input, Panel, PanelTitle, Textarea } from '@repo/ui'

type Errors = Partial<Record<'name' | 'contact' | 'subject' | 'message', string>>

function validate(data: FormData): Errors {
  const errors: Errors = {}
  const contact = String(data.get('contact') ?? '').trim()
  if (String(data.get('name') ?? '').trim().length < 2) errors.name = 'Enter your name'
  if (!/^01\d{9}$/.test(contact.replace(/[\s-]/g, '').replace(/^\+?88/, '')) && !/^\S+@\S+\.\S+$/.test(contact)) errors.contact = 'Enter a BD phone (01XXXXXXXXX) or email'
  if (String(data.get('subject') ?? '').trim().length < 3) errors.subject = 'Add a short subject'
  if (String(data.get('message') ?? '').trim().length < 10) errors.message = 'Message must be at least 10 characters'
  return errors
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate(new FormData(e.currentTarget))
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSent(true)
      e.currentTarget.reset()
    }
  }
  const err = (k: keyof Errors) => (errors[k] ? <p className="text-xs text-danger">{errors[k]}</p> : null)
  return (
    <Panel className="rounded-[20px] p-8">
      <PanelTitle className="text-2xl">Send us a message</PanelTitle>
      {sent ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-success-50 px-4 py-3 text-sm font-medium text-success">
          <CircleCheck className="size-4" /> Thanks! We received your message and will reply within 24 hours.
        </div>
      ) : null}
      <form noValidate onSubmit={onSubmit} onChange={() => sent && setSent(false)} className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="c-name"><Input id="c-name" name="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} />{err('name')}</Field>
        <Field label="Phone or email" htmlFor="c-phone"><Input id="c-phone" name="contact" placeholder="01XXXXXXXXX" aria-invalid={Boolean(errors.contact)} />{err('contact')}</Field>
        <Field label="Subject" htmlFor="c-subject" className="sm:col-span-2"><Input id="c-subject" name="subject" placeholder="How can we help?" />{err('subject')}</Field>
        <Field label="Message" htmlFor="c-message" className="sm:col-span-2"><Textarea id="c-message" name="message" placeholder="Write your message..." className="h-[140px]" />{err('message')}</Field>
        <div className="flex items-center justify-between gap-4 sm:col-span-2">
          <p className="text-sm text-muted">We reply within 24 hours (Sat–Thu).</p>
          <Button type="submit" size="xl" className="w-[155px]">Send Message</Button>
        </div>
      </form>
    </Panel>
  )
}
