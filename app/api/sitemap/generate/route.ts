import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { getAuthUser } from '@/lib/auth'

const DOMAIN = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fueldigi.in'

const STATIC_PAGES = [
  { path: '/',                          changefreq: 'weekly',  priority: '1.0', type: 'Homepage' },
  { path: '/about',                     changefreq: 'monthly', priority: '0.8', type: 'About Page' },
  { path: '/contact',                   changefreq: 'monthly', priority: '0.8', type: 'Contact Page' },
  { path: '/blog',                      changefreq: 'daily',   priority: '0.9', type: 'Blog Page' },
  { path: '/team',                      changefreq: 'monthly', priority: '0.7', type: 'Team Page' },
  { path: '/products/crm-software-development-services-in-chennai',   changefreq: 'monthly', priority: '0.8', type: 'Product Page' },
  { path: '/products/hrms-development-services-in-chennai',           changefreq: 'monthly', priority: '0.8', type: 'Product Page' },
  { path: '/products/spa-salon-management-software-in-chennai',       changefreq: 'monthly', priority: '0.8', type: 'Product Page' },
]

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    const now = new Date().toISOString()

    // Static pages
    const staticUrls = STATIC_PAGES.map(p => ({
      url: `${DOMAIN}${p.path}`,
      lastmod: now,
      changefreq: p.changefreq,
      priority: p.priority,
      type: p.type,
    }))

    // Published blog posts
    const blogs = await Blog.find({ status: 'published' })
      .select('slug updatedAt publishedAt')
      .sort({ publishedAt: -1 })
      .lean() as any[]

    const blogUrls = blogs.map(blog => ({
      url: `${DOMAIN}/blog/${blog.slug}`,
      lastmod: (blog.updatedAt || blog.publishedAt || now).toString(),
      changefreq: 'weekly',
      priority: '0.7',
      type: 'Blog Post',
    }))

    const allUrls = [...staticUrls, ...blogUrls]

    // Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${new Date(u.lastmod).toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return NextResponse.json({
      xml,
      urls: allUrls,
      totalUrls: allUrls.length,
      breakdown: {
        static: staticUrls.length,
        blogPosts: blogUrls.length,
        categories: 0,
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 })
  }
}
