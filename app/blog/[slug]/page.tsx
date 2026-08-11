import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogTwoColumnWrapper from '@/components/BlogTwoColumnWrapper'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect()
  const blog = await Blog.findOne({ slug: params.slug, status: 'published' }).lean() as any
  if (!blog) return { title: 'Blog Not Found' }
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.metaKeywords?.join(', ') || undefined,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fueldigi.in'}/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  await dbConnect()

  const blog = await Blog.findOne({ slug: params.slug, status: 'published' }).lean() as any
  if (!blog) notFound()

  const authorName = blog.author || 'FuelDigi'

  const related = await Blog.find({
    status: 'published',
    slug: { $ne: params.slug },
  })
    .select('title slug featuredImage readTime publishedAt')
    .sort({ publishedAt: -1 })
    .limit(5)
    .lean() as any[]

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  /* ── Right Sidebar ── */
  const rightSidebar = (
    <>
      {/* Related Articles */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100/80"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center gap-2.5"
          style={{ background: 'linear-gradient(135deg, #870d23 0%, #b01530 100%)' }}
        >
          <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-white font-bold text-sm uppercase tracking-widest">Related Articles</p>
        </div>

        {related.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="flex gap-3 p-3.5 hover:bg-[#870d23]/5 transition-colors duration-200 group">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    {item.featuredImage ? (
                      <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#870d23]/8">
                        <svg className="w-5 h-5 text-[#870d23]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-[#870d23] transition-colors leading-snug line-clamp-2">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                      {item.readTime && (
                        <span className="flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.readTime} min
                        </span>
                      )}
                      {item.publishedAt && (
                        <span>{new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-sm text-gray-400">No related articles found</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="rounded-2xl overflow-hidden shadow-xl relative text-center p-5"
        style={{ background: 'linear-gradient(135deg, #5a0815 0%, #870d23 40%, #b01530 70%, #d4607a 100%)' }}
      >
        {/* Orb decorations */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="relative z-10">
          <div className="w-11 h-11 rounded-2xl mx-auto mb-3 flex items-center justify-center border border-white/25"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-white font-bold text-sm mb-1">Need Custom Software?</p>
          <p className="text-white/65 text-xs mb-4 leading-relaxed">Let FuelDigi build the perfect solution for your business.</p>
          <Link
            href="/contact"
            className="block w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            style={{ background: 'rgba(255,255,255,0.95)', color: '#870d23' }}
          >
            Get Free Demo →
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden" style={{ paddingTop: '90px', minHeight: '300px' }}>

        {/* Background image */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: `url('/assets/software_development_product.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Slight dark overlay for text readability */}
        <div className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        />

        {/* Dot mesh */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full"
            style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)', top: '-150px', left: '-100px', filter: 'blur(40px)' }} />
          <div className="absolute rounded-full"
            style={{ width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(255,180,180,0.12), transparent 70%)', top: '-40px', right: '8%', filter: 'blur(50px)' }} />
          <div className="absolute rounded-full border border-white/10"
            style={{ width: '320px', height: '320px', top: '-100px', right: '-60px' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 pt-2 pb-16 flex flex-col items-center justify-center" style={{ minHeight: '300px' }}>

          {/* Blog title — centered */}
          <div className="flex flex-col items-center text-center pt-10">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-3xl drop-shadow-lg">
              {blog.title}
            </p>
            {blog.excerpt && (
              <p className="mt-3 text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl">{blog.excerpt}</p>
            )}
          </div>
        </div>

        {/* Wave curve bottom */}
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full block" style={{ height: '80px' }}>
            <path d="M0,0 C480,80 960,0 1440,0 L1440,80 L0,80 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <BlogTwoColumnWrapper right={rightSidebar}>

        {/* ── Left: image → author → content ── */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-white">

          {/* Top accent bar */}
          <div className="h-1" style={{ background: 'linear-gradient(90deg, #870d23, #d4607a, #870d23)' }} />

          {/* Featured Image — full width, responsive height */}
          {blog.featuredImage ? (
            <div className="relative w-full overflow-hidden" style={{ height: 'clamp(200px, 40vw, 420px)' }}>
              <img
                src={blog.featuredImage}
                alt={blog.featuredImageAlt || blog.title}
                className="w-full h-full object-cover block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center" style={{ height: 'clamp(160px, 30vw, 420px)', background: 'linear-gradient(135deg, rgba(135,13,35,0.06), rgba(135,13,35,0.02))' }}>
              <svg className="w-12 h-12 text-[#870d23]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Written by section */}
          <div className="mx-5 sm:mx-7 mt-5 mb-4 flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl"
            style={{ background: 'linear-gradient(135deg, rgba(135,13,35,0.05) 0%, rgba(135,13,35,0.02) 100%)', border: '1px solid rgba(135,13,35,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md"
                style={{ background: 'linear-gradient(135deg, #870d23, #b01530)' }}
              >
                {authorName[0].toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none mb-0.5">Written by</p>
                <p className="text-sm font-bold text-gray-800">{authorName}</p>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-200 hidden sm:block" />

            {blog.readTime && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#870d23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500">{blog.readTime} min read</span>
              </div>
            )}

            <div className="w-px h-8 bg-gray-200 hidden sm:block" />

            {publishedDate && (
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[#870d23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500">{publishedDate}</span>
              </div>
            )}
          </div>

          <div className="mx-5 sm:mx-7 border-t border-gray-100 mb-5" />

          {/* Blog content */}
          <div className="px-5 sm:px-7 pb-8">
            <div
              className="prose prose-base max-w-none
                prose-headings:text-[#870d23] prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
                prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-4
                prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:text-gray-700 prose-ol:text-gray-700
                prose-li:my-1 prose-li:marker:text-[#870d23]
                prose-blockquote:border-l-4 prose-blockquote:border-[#870d23] prose-blockquote:bg-[#870d23]/5 prose-blockquote:rounded-r-xl prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-gray-700
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:w-full
                prose-code:text-[#870d23] prose-code:bg-[#870d23]/8 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:shadow-lg
                prose-hr:border-[#870d23]/20 prose-hr:my-8
                prose-table:text-sm prose-th:bg-[#870d23] prose-th:text-white prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-200"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>



      </BlogTwoColumnWrapper>

      <Footer />
    </div>
  )
}
