'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AuthUser } from '@/lib/auth'

interface AdminDashboardProps {
  user: AuthUser
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ totalPosts: 0, publishedPosts: 0, draftPosts: 0, lastPostDate: null })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)

  useEffect(() => { fetchStats() }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) setStats(await response.json())
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      toast.success('Logged out successfully')
      router.push('/admin-login')
    } catch {
      toast.error('Logout failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length === 0) { setShowSearchResults(false); setSearchResults([]); return }
    if (query.length >= 2) {
      try {
        const response = await fetch(`/api/admin/search?q=${encodeURIComponent(query)}`)
        if (response.ok) {
          const data = await response.json()
          setSearchResults(data.results)
          setShowSearchResults(true)
        }
      } catch (error) {
        console.error('Search failed:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user.username}</span>!
          </h2>
          <p className="text-xl text-gray-600">Ready to create amazing content for Fuel Digi?</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Posts', value: stats.totalPosts, color: 'from-blue-500 to-blue-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { label: 'Published', value: stats.publishedPosts, color: 'from-green-500 to-green-600', icon: 'M5 13l4 4L19 7' },
            { label: 'Drafts', value: stats.draftPosts, color: 'from-yellow-500 to-yellow-600', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Last Posted', value: stats.lastPostDate ? new Date(stats.lastPostDate).toLocaleDateString() : 'No posts yet', color: 'from-purple-500 to-purple-600', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
          ].map((stat, i) => (
            <div key={i} className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="flex items-center">
                <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-bold text-gray-800">{stat.label}</p>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: 'Create New Post', desc: 'Write a new blog post', color: 'from-blue-500 to-blue-600', textColor: 'text-blue-100', path: '/admin-dashboard/blog/create', icon: 'M12 4v16m8-8H4' },
              { label: 'Manage Posts', desc: 'View and edit existing posts', color: 'from-green-500 to-green-600', textColor: 'text-green-100', path: '/admin-dashboard/blog', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { label: 'Media Library', desc: 'Manage images and files', color: 'from-purple-500 to-purple-600', textColor: 'text-purple-100', path: '/admin-dashboard/media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { label: 'Categories', desc: 'Manage blog categories', color: 'from-orange-500 to-orange-600', textColor: 'text-orange-100', path: '/admin-dashboard/categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
              { label: 'Sitemap Generator', desc: 'Generate XML sitemap', color: 'from-teal-500 to-teal-600', textColor: 'text-teal-100', path: '/admin-dashboard/sitemap', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
            ].map((action, i) => (
              <button key={i} onClick={() => router.push(action.path)} className={`group relative overflow-hidden bg-gradient-to-br ${action.color} text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <div className="relative z-10 flex items-center">
                  <div className="p-3 bg-white/20 rounded-xl mr-4 group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg mb-1">{action.label}</h3>
                    <p className={`${action.textColor} text-sm`}>{action.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-8 relative">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="relative max-w-md mx-auto">
              <input type="text" placeholder="Search posts, categories, media..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500" />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {showSearchResults && (
              <div className="absolute top-full left-6 right-6 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                {searchResults.length > 0 ? (
                  <div className="p-4">
                    {searchResults.map((result, index) => (
                      <div key={index} onClick={() => { if (result.type === 'post') router.push(`/admin-dashboard/blog/edit/${result.id}`); else if (result.type === 'category') router.push('/admin-dashboard/categories'); else router.push('/admin-dashboard/media'); setShowSearchResults(false); setSearchQuery('') }} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-100 last:border-b-0">
                        <div className={`p-2 rounded-lg mr-3 ${result.type === 'post' ? 'bg-blue-100 text-blue-600' : result.type === 'category' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{result.title}</h4>
                          <p className="text-sm text-gray-500 capitalize">{result.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">No results found for "{searchQuery}"</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 text-center">
          <button onClick={handleLogout} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-colors duration-200 disabled:opacity-50">
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  )
}
