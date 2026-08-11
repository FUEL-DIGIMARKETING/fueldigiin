'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Head from 'next/head'

interface SitemapUrl {
  url: string
  lastmod: string
  changefreq: string
  priority: string
  type: string
}

export default function SitemapGenerator() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const [urls, setUrls] = useState<SitemapUrl[]>([])
  const [sitemapXml, setSitemapXml] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) setIsAuthenticated(true)
        else router.push('/admin-login')
      } catch { router.push('/admin-login') }
      finally { setLoading(false) }
    }
    checkAuth()
  }, [])

  const steps = [
    'Scanning website structure...',
    'Fetching blog posts from database...',
    'Analyzing URL patterns...',
    'Generating XML sitemap...',
    'Validating sitemap structure...',
    'Finalizing sitemap...'
  ]

  const generateSitemap = async () => {
    setIsGenerating(true)
    setProgress(0)
    setShowResults(false)
    setUrls([])
    setSitemapXml('')
    try {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i])
        setProgress(((i + 1) / steps.length) * 100)
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
      }
      const response = await fetch('/api/sitemap/generate', { method: 'POST' })
      if (!response.ok) throw new Error('Failed to generate sitemap')
      const data = await response.json()
      setUrls(data.urls)
      setSitemapXml(data.xml)
      setShowResults(true)
      const breakdown = data.breakdown || {}
      toast.success(`Sitemap generated! Found ${data.totalUrls} URLs: ${breakdown.static || 0} pages, ${breakdown.blogPosts || 0} blog posts, ${breakdown.categories || 0} categories`)
    } catch (error) {
      console.error('Sitemap generation failed:', error)
      toast.error('Failed to generate sitemap')
    } finally {
      setIsGenerating(false)
      setCurrentStep('')
    }
  }

  const downloadSitemap = () => {
    const blob = new Blob([sitemapXml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Sitemap downloaded!')
  }

  const getTypeColor = (type: string) => {
    if (type === 'Homepage') return 'bg-blue-100 text-blue-800'
    if (type === 'Blog Post') return 'bg-green-100 text-green-800'
    if (type === 'Category Page') return 'bg-purple-100 text-purple-800'
    if (type.includes('Page')) return 'bg-gray-100 text-gray-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  if (loading) {
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
        <title>Sitemap Generator - Admin Dashboard</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {/* Header */}
          <div className="text-center mb-12">
            <button onClick={() => router.back()} className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back to Dashboard
            </button>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">XML Sitemap Generator</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Generate a comprehensive XML sitemap including all pages and blog posts</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {!isGenerating && !showResults && (
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-teal-100 to-teal-200 rounded-full mb-6">
                  <svg className="w-12 h-12 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Generate Sitemap</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Click the button below to scan your website and generate a comprehensive XML sitemap</p>
                <button onClick={generateSitemap} className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Generate Sitemap
                </button>
              </div>
            )}

            {isGenerating && (
              <div className="p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mb-6 animate-pulse">
                    <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating Sitemap</h2>
                  <p className="text-gray-600 mb-6">{currentStep}</p>
                </div>
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2"><span>Progress</span><span>{Math.round(progress)}%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const isCompleted = progress > ((index + 1) / steps.length) * 100
                    const isCurrent = currentStep === step
                    return (
                      <div key={index} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${isCompleted ? 'bg-green-50 text-green-800' : isCurrent ? 'bg-teal-50 text-teal-800' : 'bg-gray-50 text-gray-500'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${isCompleted ? 'bg-green-500' : isCurrent ? 'bg-teal-500' : 'bg-gray-300'}`}>
                          {isCompleted ? <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : <div className={`w-2 h-2 bg-white rounded-full ${isCurrent ? 'animate-pulse' : ''}`}></div>}
                        </div>
                        <span className="font-medium">{step}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {showResults && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sitemap Generated Successfully!</h2>
                  <p className="text-gray-600 mb-4">Found {urls.length} URLs</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-3"><div className="text-2xl font-bold text-blue-600">{urls.filter(u => u.type === 'Homepage' || u.type.includes('Page')).length}</div><div className="text-sm text-blue-800">Static Pages</div></div>
                    <div className="bg-green-50 rounded-lg p-3"><div className="text-2xl font-bold text-green-600">{urls.filter(u => u.type === 'Blog Post').length}</div><div className="text-sm text-green-800">Blog Posts</div></div>
                    <div className="bg-purple-50 rounded-lg p-3"><div className="text-2xl font-bold text-purple-600">{urls.filter(u => u.type === 'Category Page').length}</div><div className="text-sm text-purple-800">Categories</div></div>
                    <div className="bg-orange-50 rounded-lg p-3"><div className="text-2xl font-bold text-orange-600">{urls.length}</div><div className="text-sm text-orange-800">Total URLs</div></div>
                  </div>
                  <button onClick={downloadSitemap} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg mr-4">Download sitemap.xml</button>
                  <button onClick={() => setShowResults(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">Generate New</button>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">URLs Found ({urls.length})</h3>
                  <div className="space-y-2">
                    {urls.map((urlData, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate" title={urlData.url}>{urlData.url}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(urlData.type)}`}>{urlData.type}</span>
                            <span className="text-xs text-gray-500">Priority: {urlData.priority}</span>
                            <span className="text-xs text-gray-500">{urlData.changefreq}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 ml-4">{new Date(urlData.lastmod).toLocaleDateString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
