import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const query: any = {}
    if (status && status !== 'all') {
      query.status = status
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ]
    }

    const skip = (page - 1) * limit
    const total = await Blog.countDocuments(query)
    const blogs = await Blog.find(query)
      .select('title slug excerpt status featuredImage createdAt publishedAt wordCount readTime author')
      .populate('authorId', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Blog listing error:', error)
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 })
  }
}