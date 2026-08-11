'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishedAt: string
  readTime: number
  author: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBlogs(page, search)
  }, [page])

  useEffect(() => {
    const delay = setTimeout(() => fetchBlogs(1, search), 400)
    return () => clearTimeout(delay)
  }, [search])

  const fetchBlogs = async (p: number, q: string) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(p), limit: '9' })
      if (q) params.set('search', q)
      const res = await fetch(`/api/blogs?${params}`)
      const data = await res.json()
      setBlogs(data.blogs || [])
      setTotalPages(data.pagination?.pages || 1)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden pt-24 pb-28" style={{ background: 'linear-gradient(135deg, #870d23 0%, #b01530 40%, #d4607a 70%, #ffffff 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, white, transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left text */}
            <div className="flex-1 text-left">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-white/30">
                Build Better with Expert Insights
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                Our <span className="text-white italic font-bold">Blog</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-lg">
                Stay updated with the latest articles on software engineering, mobile app development, emerging technologies, and product innovation from the FuelDigi team.
              </p>
            </div>

            {/* Right search card */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-8 shadow-2xl">
                <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Search Articles</p>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:bg-white/30 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10 fill-gray-50">
            <path d="M0,20 C480,40 960,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Category filters removed */}


        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-lg">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#870d23]/10 to-[#870d23]/20 flex items-center justify-center">
                      <svg className="w-12 h-12 text-[#870d23]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {(blog as any).categories?.[0] && (
                    <span className="absolute top-3 left-3 bg-[#870d23] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {(blog as any).categories?.[0]}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-gray-900 font-bold text-lg leading-snug mb-2 group-hover:text-[#870d23] transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  {blog.excerpt && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{blog.excerpt}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#870d23] flex items-center justify-center text-white font-bold text-sm">
                        {(blog.author || 'F')[0].toUpperCase()}
                      </div>
                      <span className="font-semibold text-gray-700 text-sm">{blog.author || 'FuelDigi'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {blog.readTime && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {blog.readTime} min
                        </span>
                      )}
                      {blog.publishedAt && (
                        <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            <button onClick={() => { const p = Math.max(1, page - 1); setPage(p); fetchBlogs(p, search) }} disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-white shadow-sm text-gray-600 hover:bg-[#870d23] hover:text-white disabled:opacity-40 transition-all font-medium text-sm">
              ← Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => { setPage(i + 1); fetchBlogs(i + 1, search) }}
                className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${page === i + 1 ? 'bg-[#870d23] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-[#870d23]/10 shadow-sm'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => { const p = Math.min(totalPages, page + 1); setPage(p); fetchBlogs(p, search) }} disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-white shadow-sm text-gray-600 hover:bg-[#870d23] hover:text-white disabled:opacity-40 transition-all font-medium text-sm">
              Next →
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
