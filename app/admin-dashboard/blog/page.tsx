'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Head from 'next/head'

interface Blog {
  _id: string
  title: string
  slug: string
  status: string
  author: string
  authorId: { username: string }
  createdAt: string
  publishedAt?: string
  updatedAt: string
  wordCount: number
  readingTime: number
}

export default function BlogListPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          setIsAuthenticated(true)
          fetchBlogs()
        } else {
          router.push('/admin-login')
        }
      } catch {
        router.push('/admin-login')
      } finally {
        setAuthLoading(false)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) fetchBlogs()
  }, [filter, isAuthenticated])

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`/api/blog?status=${filter}&limit=20`, { credentials: 'include' })
      const data = await response.json()
      if (response.ok) {
        setBlogs(data.blogs)
      } else {
        toast.error(`Failed to fetch blogs: ${data.error || 'Unknown error'}`)
      }
    } catch {
      toast.error('Failed to fetch blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE', credentials: 'include' })
      if (response.ok) {
        toast.success('Blog deleted successfully')
        fetchBlogs()
      } else {
        const errorData = await response.json()
        toast.error(`Failed to delete blog: ${errorData.error || 'Unknown error'}`)
      }
    } catch {
      toast.error('Network error occurred')
    }
  }

  const handleBulkAction = async (action: string) => {
    if (selectedBlogs.length === 0) { toast.error('Please select blogs first'); return }
    if (action === 'delete' && !confirm(`Delete ${selectedBlogs.length} blogs?`)) return
    try {
      const promises = selectedBlogs.map(id =>
        action === 'delete'
          ? fetch(`/api/blog/${id}`, { method: 'DELETE', credentials: 'include' })
          : fetch(`/api/blog/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ status: action }) })
      )
      const results = await Promise.all(promises)
      const failed = results.filter(r => !r.ok)
      if (failed.length > 0) {
        toast.error(`${failed.length} actions failed`)
      } else {
        toast.success(`Blogs ${action}d successfully`)
      }
      setSelectedBlogs([])
      fetchBlogs()
    } catch {
      toast.error('Bulk action failed')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Manage Posts - Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button onClick={() => router.push('/admin-dashboard')} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Manage Posts</h1>
              </div>
              <button onClick={() => router.push('/admin-dashboard/blog/create')} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium shadow-lg">
                Add New Post
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Bulk Actions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {['all', 'published', 'draft', 'scheduled'].map((status) => (
                  <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
              {selectedBlogs.length > 0 && (
                <div className="flex space-x-2">
                  <button onClick={() => handleBulkAction('published')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Publish ({selectedBlogs.length})</button>
                  <button onClick={() => handleBulkAction('draft')} className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">Draft ({selectedBlogs.length})</button>
                  <button onClick={() => handleBulkAction('delete')} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete ({selectedBlogs.length})</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Blog Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blogs found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first blog post.</p>
                <button onClick={() => router.push('/admin-dashboard/blog/create')} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input type="checkbox" onChange={(e) => { if (e.target.checked) setSelectedBlogs(blogs.map(b => b._id)); else setSelectedBlogs([]) }} className="rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-white/50 transition-colors">
                        <td className="px-6 py-4">
                          <input type="checkbox" checked={selectedBlogs.includes(blog._id)} onChange={(e) => { if (e.target.checked) setSelectedBlogs([...selectedBlogs, blog._id]); else setSelectedBlogs(selectedBlogs.filter(id => id !== blog._id)) }} className="rounded border-gray-300" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">/{blog.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>{blog.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{(blog as any).author || blog.authorId?.username || '—'}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{blog.wordCount} words • {blog.readingTime} min read</td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button onClick={() => router.push(`/admin-dashboard/blog/edit/${blog._id}`)} className="text-blue-600 hover:text-blue-900">Edit</button>
                          <button onClick={() => window.open(`/blog/${blog.slug}`, '_blank')} className="text-green-600 hover:text-green-900">View</button>
                          <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
