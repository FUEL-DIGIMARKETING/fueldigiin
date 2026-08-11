'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Head from 'next/head'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ContentAnalyzer from '@/components/admin/ContentAnalyzer'

export default function CreateBlogPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const DOMAIN = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fueldigi.in'

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    status: 'draft',
    publishDate: new Date().toISOString().slice(0, 16),
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonical: '',
    featuredImage: '',
    featuredImageAlt: '',
    author: ''
  })
  const [categories, setCategories] = useState<any[]>([])
  const [blogId, setBlogId] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          setIsAuthenticated(true)
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
    const interval = setInterval(() => {
      if (formData.title || formData.content) handleAutoSave()
    }, 30000)
    return () => clearInterval(interval)
  }, [formData.title, formData.content])

  useEffect(() => {
    const hasContent = formData.title || formData.content || formData.excerpt || formData.metaTitle || formData.metaDescription
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasContent) { e.preventDefault(); e.returnValue = '' }
    }
    if (hasContent) window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [formData])

  const handleAutoSave = async () => {
    if (!formData.title && !formData.content) return
    setAutoSaving(true)
    try {
      const autoPayload = {
        ...formData,
        status: 'draft',
        metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
      }
      if (blogId) {
        await fetch(`/api/blog/${blogId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(autoPayload) })
      } else {
        const response = await fetch('/api/blog/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(autoPayload) })
        if (response.ok) { const data = await response.json(); setBlogId(data.blog._id) }
      }
    } catch (error) {
      console.error('Auto-save failed:', error)
    } finally {
      setAutoSaving(false)
    }
  }

  const handleSubmit = async (status: string) => {
    if (!formData.title || !formData.content) { toast.error('Title and content are required'); return }
    if (status === 'draft') setSaveLoading(true); else setLoading(true)
    try {
      let response
      const payload = {
        ...formData,
        status,
        publishedAt: status === 'published' ? new Date(formData.publishDate) : undefined,
        metaKeywords: formData.metaKeywords.split(',').map(k => k.trim()).filter(Boolean),
      }
      if (blogId) {
        response = await fetch(`/api/blog/${blogId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      } else {
        response = await fetch('/api/blog/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      }
      const data = await response.json()
      if (response.ok) {
        if (status === 'draft') {
          toast.success('Draft saved successfully!')
          setLastSaved(new Date())
          if (!blogId) setBlogId(data.blog._id)
        } else {
          toast.success('Blog published successfully!')
          router.push('/admin-dashboard/blog')
        }
      } else {
        toast.error(data.error || 'Failed to save blog')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      if (status === 'draft') setSaveLoading(false); else setLoading(false)
    }
  }

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

  const extractH1AndUpdateSlug = (content: string) => {
    const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i)
    if (match) {
      const h1Text = match[1].replace(/<[^>]+>/g, '').trim()
      const slug = generateSlug(h1Text)
      setFormData(prev => ({
        ...prev,
        slug,
        canonical: prev.canonical && prev.canonical !== `${DOMAIN}/blog/${prev.slug}`
          ? prev.canonical
          : `${DOMAIN}/blog/${slug}`
      }))
    }
  }

  const updateFormData = (field: string, value: any) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const handleImageUpload = async (file: File) => {
    const fd = new FormData()
    fd.append('file', file)
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: fd })
      if (response.ok) {
        const data = await response.json()
        let cleanUrl = data.url
        if (cleanUrl.includes('/home/')) {
          const match = cleanUrl.match(/\/uploads\/blogs\/(\d{4})\/(\d{2})\/(.+)$/)
          if (match) cleanUrl = `/uploads/blogs/${match[1]}/${match[2]}/${match[3]}`
        }
        updateFormData('featuredImage', cleanUrl)
      }
    } catch (error) {
      console.error('Upload failed:', error)
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
        <title>Create Post - Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button onClick={() => router.back()} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Create New Post</h1>
                {autoSaving && (
                  <span className="text-sm text-blue-600 animate-pulse flex items-center">
                    <svg className="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Auto-saving...
                  </span>
                )}
                {lastSaved && <span className="text-sm text-gray-600">Last saved: {lastSaved.toLocaleTimeString()}</span>}
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => handleSubmit('draft')} disabled={saveLoading || loading} className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors disabled:opacity-50 font-medium flex items-center gap-2">
                  {saveLoading && <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                  {saveLoading ? 'Saving...' : 'Save Draft'}
                </button>
                <button onClick={() => handleSubmit('published')} disabled={loading} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 font-medium shadow-lg">
                  {loading ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className={`grid gap-8 ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-4'}`}>
            {/* Left Sidebar - SEO */}
            <div className={`space-y-6 ${isFullscreen ? 'hidden' : 'lg:col-span-1'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input type="text" value={formData.metaTitle} onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="SEO title..." />
                    <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea value={formData.metaDescription} onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="SEO description..." />
                    <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma-separated)</label>
                    <input type="text" value={formData.metaKeywords} onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="keyword1, keyword2, keyword3" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
                    <input type="text" value={formData.canonical} onChange={(e) => setFormData({ ...formData, canonical: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm" placeholder={`${DOMAIN}/blog/slug`} />
                    <p className="text-xs text-gray-500 mt-1">Defaults to {DOMAIN}/blog/{formData.slug || 'slug'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Publish Date</h3>
                <input type="datetime-local" value={formData.publishDate} onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" />
                <p className="text-xs text-gray-500 mt-1">This will be used as the blog's published date</p>
              </div>
            </div>

            {/* Main Editor */}
            <div className={`space-y-6 ${isFullscreen ? 'col-span-1' : 'lg:col-span-2'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter post title..." className="w-full text-3xl font-bold border-none outline-none bg-transparent placeholder-gray-400 text-gray-800" />
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="post-slug" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm" />
                  <p className="text-xs text-gray-500 mt-1">URL: /blog/{formData.slug}</p>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <button onClick={() => setIsFullscreen(!isFullscreen)} className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-800 hover:bg-gray-700 rounded-lg transition-colors text-white">
                    {isFullscreen ? (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5m11 5.5V4.5M15 9h4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5m11-5.5v4.5m0-4.5h4.5m0 0l-5.5 5.5" /></svg>Exit Fullscreen</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>Fullscreen</>
                    )}
                  </button>
                </div>
                <RichTextEditor value={formData.content} onChange={(content) => { updateFormData('content', content); extractH1AndUpdateSlug(content) }} height={isFullscreen ? 800 : 600} />
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800" placeholder="Brief description of the post..." />
              </div>
            </div>

            {/* Right Sidebar */}
            <div className={`space-y-6 ${isFullscreen ? 'hidden' : 'lg:col-span-1'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Featured Image</h3>
                <div className="space-y-4">
                  {formData.featuredImage ? (
                    <div className="relative">
                      <img src={formData.featuredImage} alt="Featured image preview" className="w-full h-32 object-cover rounded-lg" />
                      <button onClick={() => updateFormData('featuredImage', '')} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">×</button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500">No featured image</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file) }} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-sm bg-white hover:bg-gray-50 transition-colors" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                    <input type="text" value={formData.featuredImageAlt || ''} onChange={(e) => updateFormData('featuredImageAlt', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm" placeholder="Image description..." />
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Author</h3>
                <input type="text" value={formData.author} onChange={(e) => updateFormData('author', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm" placeholder="Author name..." />
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">SEO Analysis</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Meta Title ({formData.metaTitle.length}/60)</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60 ? 'bg-green-100 text-green-800' : formData.metaTitle.length > 60 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60 ? 'Good' : formData.metaTitle.length > 60 ? 'Too long' : 'Too short'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Meta Description ({formData.metaDescription.length}/160)</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'bg-green-100 text-green-800' : formData.metaDescription.length > 160 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'Good' : formData.metaDescription.length > 160 ? 'Too long' : 'Too short'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Keywords</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${formData.metaKeywords.split(',').filter(k => k.trim()).length >= 3 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {formData.metaKeywords.split(',').filter(k => k.trim()).length >= 3 ? 'Good' : 'Add more'}
                    </span>
                  </div>
                </div>
              </div>

              <ContentAnalyzer content={formData.content} title={formData.title} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
