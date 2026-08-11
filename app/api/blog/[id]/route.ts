import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { getAuthUser } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 })
    }

    const blog = await Blog.findById(params.id).populate('authorId', 'username')

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // if author string is empty, backfill from authorId.username and save
    if (!blog.author && (blog.authorId as any)?.username) {
      blog.author = (blog.authorId as any).username
      await Blog.findByIdAndUpdate(params.id, { $set: { author: blog.author } })
    }

    return NextResponse.json({ blog })
  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 })
    }

    const data = await request.json()

    if (!data.title || !data.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    const existingBlog = await Blog.findById(params.id)
    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    // safe fields to update
    const allowedFields = [
      'title', 'slug', 'content', 'excerpt', 'status',
      'featuredImage', 'featuredImageAlt',
      'tags', 'metaTitle', 'metaDescription',
      'metaKeywords', 'canonical', 'h1', 'author'
    ]

    const updateData: any = { updatedAt: new Date() }

    allowedFields.forEach(key => {
      if (data[key] !== undefined) {
        updateData[key] = data[key]
      }
    })

    // handle publishedAt
    if (data.status === 'published') {
      updateData.publishedAt = data.publishedAt ? new Date(data.publishedAt) : (existingBlog.publishedAt || new Date())
    }

    const updated = await Blog.findByIdAndUpdate(
      params.id,
      { $set: updateData },
      { new: true, runValidators: false }
    )

    return NextResponse.json({ message: 'Blog updated successfully', blog: updated })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 })
    }

    const blog = await Blog.findById(params.id)

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    await Blog.findByIdAndDelete(params.id)

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
