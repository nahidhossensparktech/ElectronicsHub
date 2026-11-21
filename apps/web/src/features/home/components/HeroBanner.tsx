import Image from 'next/image'
import Link from 'next/link'

/** Hero banner with official Electronic Hub artwork and interactive links. */
export function HeroBanner() {
  return (
    <div className="relative flex-1 overflow-hidden rounded-[20px] bg-[#f5f8fc] aspect-[1024/434] min-h-[220px] sm:min-h-[300px] lg:min-h-[434px]">
      <Image
        unoptimized
        src="/brand/hero-banner.jpg"
        alt="Every Component. Every Store. One Hub. Discover electronics components from trusted shops and suppliers across Bangladesh."
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 980px"
        className="object-cover"
      />
      <Link
        href="/products"
        aria-label="Explore Components"
        className="absolute top-[71%] left-[8.8%] h-[12.5%] w-[17.5%] rounded-lg transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <Link
        href="/shops"
        aria-label="Find a Store"
        className="absolute top-[71%] left-[27.5%] h-[12.5%] w-[12%] rounded-lg transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  )
}
