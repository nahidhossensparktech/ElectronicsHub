import Image from 'next/image'

/** Blue category intro card with three product tiles. */
export function CategoryBanner({ title, description, images }: { title: string; description: string; images: string[] }) {
  return (
    <div className="flex items-center justify-between gap-8 rounded-[20px] bg-brand px-10 py-9">
      <div className="max-w-[560px]">
        <p className="text-xs font-semibold tracking-[0.06em] text-brand-100 uppercase">Category</p>
        <h2 className="mt-2 font-display text-[32px] leading-10 font-bold text-white">{title}</h2>
        <p className="mt-2 text-[15px] leading-6 text-brand-100">{description}</p>
      </div>
      <div className="hidden gap-3 md:flex">
        {images.map((src) => (
          <span key={src} className="relative size-[104px] rounded-2xl bg-white">
            <Image unoptimized src={src} alt="" fill className="object-contain p-5" />
          </span>
        ))}
      </div>
    </div>
  )
}
