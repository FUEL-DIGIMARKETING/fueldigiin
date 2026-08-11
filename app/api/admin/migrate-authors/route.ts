import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import User from '@/models/User'
import { getAuthUser } from '@/lib/auth'

export async function POST() {
  try {
    const authUser = await getAuthUser()
    if (!authUser) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    // find all blogs with no author string but have authorId
    const blogs = await Blog.find({ $or: [{ author: '' }, { author: { $exists: false } }] })
    let updated = 0

    for (const blog of blogs) {
      if (blog.authorId) {
        const user = await User.findById(blog.authorId).select('username').lean() as any
        if (user?.username) {
          blog.author = user.username
          await blog.save()
          updated++
        }
      }
    }

    return NextResponse.json({ message: `Migration complete. Updated ${updated} blogs.` })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
  }
}