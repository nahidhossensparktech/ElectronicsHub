'use client'

import {
  CheckCircle2,
  CheckSquare,
  Flag,
  Headphones,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Store,
  Tag,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@repo/utils'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutGrid },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/vendors', label: 'Vendors', icon: Store },
  { href: '/admin/vendor-approvals', label: 'Vendor Approvals', icon: CheckCircle2, badge: '27' },
  { href: '/admin/shops', label: 'Shops', icon: Store },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/product-approvals', label: 'Product Approval', icon: CheckSquare },
  { href: '/admin/categories', label: 'Categories', icon: Layers },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/wholesale', label: 'Wholesale', icon: Tag },
  { href: '/admin/banners', label: 'Banners & Promotions', icon: ImageIcon },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/reports', label: 'Reports', icon: Flag, badge: '9' },
  { href: '/admin/support', label: 'Support', icon: Headphones },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen?: boolean
  onClose?: () => void
}) {
  const pathname = usePathname()

  const navContent = (
    <div className="flex h-full flex-col bg-[#F8FAFC]">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <Link href="/" className="flex items-center" title="Go to Storefront">
          <Image
            src="/brand/logo.png"
            alt="Electronic Hub.bd"
            width={160}
            height={42}
            priority
            className="h-8.5 w-auto object-contain"
          />
        </Link>
        {mobileOpen && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <div className="px-6 pb-2">
        <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">ADMIN PANEL</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {adminNavItems.map(({ href, label, icon: Icon, badge }) => {
          const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                'group flex h-10 items-center justify-between rounded-xl px-3 text-sm font-semibold transition-all duration-150',
                active
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900',
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'size-[18px] transition-colors',
                    active ? 'text-white' : 'text-slate-500 group-hover:text-slate-900',
                  )}
                  strokeWidth={2}
                />
                <span>{label}</span>
              </div>
              {badge ? (
                <span
                  className={cn(
                    'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold',
                    active ? 'bg-white text-[#2563EB]' : 'bg-blue-100 text-[#2563EB]',
                  )}
                >
                  {badge}
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="border-t border-slate-200/80 p-4">
        <Link
          href="/"
          className="flex h-9.5 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 hover:bg-slate-200/70 transition-colors"
        >
          <Store className="size-4.5 text-slate-500" />
          <span>Customer Storefront</span>
        </Link>
        <Link
          href="/"
          className="mt-1 flex h-9.5 items-center gap-3 rounded-xl px-3 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="size-4.5" />
          <span>Log out</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 border-r border-slate-200/80 lg:block">
        {navContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
          <div className="relative z-10 w-[264px] shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  )
}
