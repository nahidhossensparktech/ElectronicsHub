'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

export type ParamRecord = Record<string, string | string[] | undefined>

/**
 * Read and update the current URL's search params. The server page passes its
 * `searchParams` in (no `useSearchParams`, so no Suspense boundary is needed).
 * Any change resets pagination unless `page` is set explicitly.
 */
export function useUrlParams(current: ParamRecord) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useMemo(() => {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(current)) {
      const value = Array.isArray(v) ? v[0] : v
      if (value) sp.set(k, value)
    }
    return sp
  }, [current])

  const update = useCallback(
    (changes: Record<string, string | null>) => {
      const sp = new URLSearchParams(params.toString())
      for (const [k, v] of Object.entries(changes)) {
        if (v === null || v === '') sp.delete(k)
        else sp.set(k, v)
      }
      if (!('page' in changes)) sp.delete('page')
      const s = sp.toString()
      router.push(s ? `${pathname}?${s}` : pathname, { scroll: false })
    },
    [params, pathname, router],
  )

  const toggleInList = useCallback(
    (key: string, value: string) => {
      const list = (params.get(key) ?? '').split(',').filter(Boolean)
      const next = list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
      update({ [key]: next.join(',') || null })
    },
    [params, update],
  )

  return { params, pathname, update, toggleInList }
}
