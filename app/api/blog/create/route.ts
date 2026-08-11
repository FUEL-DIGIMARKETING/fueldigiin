import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { getAuthUser } from '@/lib/auth'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const data = await request.json()
    let { 
      title, 
      slug: rawSlug,
      content, 
      excerpt, 
      status = 'draft', 
      tags = [], 
      metaTitle, 
      metaDescription, 
      metaKeywords = [], 
      canonical,
      featuredImage,
      featuredImageAlt,
      author,
      publishedAt 
    } = data

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    let slug = rawSlug ? rawSlug : generateSlug(title)

    // Ensure unique slug
    let counter = 1
    let originalSlug = slug
    while (await Blog.findOne({ slug })) {
      slug = `${originalSlug}-${counter}`
      counter++
    }

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      status,
      authorId: user.userId,
      author: author || '',
      tags,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      metaKeywords,
      canonical,
      featuredImage,
      featuredImageAlt,
      publishedAt: status === 'published' ? (publishedAt ? new Date(publishedAt) : new Date()) : null
    })

    await blog.save()

    return NextResponse.json({ message: 'Blog created successfully', blog }, { status: 201 })
  } catch (error) {
    console.error('Create blog error:', error)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}