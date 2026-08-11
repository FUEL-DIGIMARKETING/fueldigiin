'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  color: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', description: '', color: '#3B82F6' })
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(false)

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/blog-categories')
      if (response.ok) setCategories(await response.json())
    } catch {
      toast.error('Failed to fetch categories')
    }
  }

  const initializeDefaultCategories = async () => {
    setInitializing(true)
    try {
      const response = await fetch('/api/blog-categories/init', { method: 'POST' })
      if (response.ok) {
        toast.success('Default categories initialized!')
        fetchCategories()
      } else {
        toast.error('Failed to initialize categories')
      }
    } catch {
      toast.error('Failed to initialize categories')
    } finally {
      setInitializing(false)
    }
  }

  const deleteCategory = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete "${categoryName}"?`)) return
    try {
      const response = await fetch(`/api/blog-categories/${categoryId}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Category deleted successfully')
        fetchCategories()
      } else {
        toast.error('Failed to delete category')
      }
    } catch {
      toast.error('Failed to delete category')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/api/blog-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        toast.success('Category created successfully')
        setFormData({ name: '', description: '', color: '#3B82F6' })
        setShowForm(false)
        fetchCategories()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to create category')
      }
    } catch {
      toast.error('Failed to create category')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.history.back()} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</h1>
            </div>
            <div className="flex gap-3">
              {categories.length === 0 && (
                <button onClick={initializeDefaultCategories} disabled={initializing} className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-colors font-medium shadow-lg disabled:opacity-50">
                  {initializing ? 'Initializing...' : 'Add Default Categories'}
                </button>
              )}
              <button onClick={() => setShowForm(!showForm)} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium shadow-lg">
                {showForm ? 'Cancel' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-16 h-10 border border-gray-300 rounded-lg" />
              </div>
              <button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50">
                {loading ? 'Creating...' : 'Create Category'}
              </button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow relative group">
              <button onClick={(e) => { e.stopPropagation(); deleteCategory(category._id, category.name) }} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">×</button>
              <div className="cursor-pointer" onClick={() => window.open(`/blog?category=${category.slug}`, '_blank')}>
                <div className="flex items-center mb-3">
                  <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: category.color }} />
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
                {category.description && <p className="text-gray-600 text-sm mb-3">{category.description}</p>}
                <p className="text-xs text-gray-500">Slug: {category.slug}</p>
                <p className="text-xs text-blue-600 mt-2">Click to view blogs →</p>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found. Create your first category!</p>
          </div>
        )}
      </div>
    </div>
  )
}
