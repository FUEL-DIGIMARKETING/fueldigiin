import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const search = searchParams.get('search')

    const query: any = { status: 'published' }
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } }
    ]

    const skip = (page - 1) * limit
    const total = await Blog.countDocuments(query)
    const blogs = await Blog.find(query)
      .select('title slug excerpt featuredImage publishedAt readTime author')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return NextResponse.json({
      blogs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}
