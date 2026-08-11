import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const [totalPosts, publishedPosts, draftPosts, lastPost] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Blog.countDocuments({ status: 'draft' }),
      Blog.findOne({ status: 'published' }, {}, { sort: { publishedAt: -1 } })
    ])

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      lastPostDate: lastPost?.publishedAt || null
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}