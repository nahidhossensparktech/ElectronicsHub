'use client'

import {
  Edit,
  FolderTree,
  Layers,
  MoreVertical,
  Plus,
  Search,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

interface CategoryItem {
  id: string
  name: string
  slug: string
  parent: string
  productCount: number
  featured: boolean
}

const initialCategories: CategoryItem[] = [
  { id: 'cat-1', name: 'Microcontrollers & Dev Boards', slug: 'microcontrollers', parent: 'Root', productCount: 4280, featured: true },
  { id: 'cat-2', name: 'Sensors & Modules', slug: 'sensors-modules', parent: 'Root', productCount: 8940, featured: true },
  { id: 'cat-3', name: 'Integrated Circuits (ICs)', slug: 'integrated-circuits', parent: 'Root', productCount: 24500, featured: true },
  { id: 'cat-4', name: 'Resistors, Capacitors & Passives', slug: 'passives', parent: 'Root', productCount: 48900, featured: true },
  { id: 'cat-5', name: 'Power Supplies & Converters', slug: 'power-supplies', parent: 'Root', productCount: 6120, featured: true },
  { id: 'cat-6', name: 'Robotics, Motors & Drivers', slug: 'robotics-motors', parent: 'Root', productCount: 3840, featured: false },
  { id: 'cat-7', name: 'Diodes & Transistors', slug: 'diodes-transistors', parent: 'Integrated Circuits (ICs)', productCount: 14200, featured: false },
  { id: 'cat-8', name: 'Soldering & Lab Tools', slug: 'lab-tools', parent: 'Root', productCount: 2900, featured: false },
]

export function AdminCategoriesView() {
  const [categories, setCategories] = useState(initialCategories)
  const [search, setSearch] = useState('')
  const [newCatName, setNewCatName] = useState('')

  const handleAddCategory = () => {
    if (!newCatName.trim()) return
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      parent: 'Root',
      productCount: 0,
      featured: false,
    }
    setCategories((prev) => [newCat, ...prev])
    setNewCatName('')
  }

  const filtered = categories.filter((c) => {
    if (search.trim()) {
      return c.name.toLowerCase().includes(search.toLowerCase()) || c.slug.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Product Categories</h1>
          <p className="text-xs text-slate-500 mt-1">Organize electronics hierarchy, component classifications, and storefront filters</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New category name..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="h-9 px-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none w-56 bg-white"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="h-9 px-3.5 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="size-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8.5 pl-9 pr-3 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none bg-slate-50"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">{filtered.length} categories total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/75 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Category Name</th>
                <th className="py-3 px-6">URL Slug</th>
                <th className="py-3 px-6">Parent Level</th>
                <th className="py-3 px-6">Linked Products</th>
                <th className="py-3 px-6">Storefront Featured</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900 flex items-center gap-2.5">
                    <Layers className="size-4 text-blue-600 shrink-0" />
                    <span>{cat.name}</span>
                  </td>
                  <td className="py-3.5 px-6 font-mono text-slate-500 text-[11px]">/{cat.slug}</td>
                  <td className="py-3.5 px-6 text-slate-600 font-medium">{cat.parent}</td>
                  <td className="py-3.5 px-6 font-bold text-slate-800">{cat.productCount.toLocaleString()} items</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        cat.featured ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <Edit className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        className="size-7 inline-flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
