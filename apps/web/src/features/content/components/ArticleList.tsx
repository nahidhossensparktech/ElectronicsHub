import { ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'

export function ArticleList({ articles }: { articles: { title: string; q: string }[] }) {
  return (
    <ul className="space-y-3">
      {articles.map((a) => (
        <li key={a.title}>
          <Link href={`/faq?q=${encodeURIComponent(a.q)}`} className="flex h-[52px] items-center gap-3 rounded-xl bg-white px-4 text-sm font-semibold text-ink hover:text-brand">
            <FileText className="size-4 text-brand" />
            <span className="flex-1">{a.title}</span>
            <ChevronRight className="size-4 text-subtle" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
