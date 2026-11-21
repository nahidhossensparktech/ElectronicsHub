const socials = [
  { label: 'Facebook', short: 'f', href: 'https://facebook.com' },
  { label: 'LinkedIn', short: 'in', href: 'https://linkedin.com' },
  { label: 'X', short: 'X', href: 'https://x.com' },
  { label: 'YouTube', short: '▶', href: 'https://youtube.com' },
]

export function SocialLinks() {
  return (
    <ul className="flex gap-2.5">
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noreferrer"
            className="inline-flex size-[38px] items-center justify-center rounded-[10px] bg-ink-800 text-[13px] font-bold text-white hover:bg-brand"
          >
            {social.short}
          </a>
        </li>
      ))}
    </ul>
  )
}
