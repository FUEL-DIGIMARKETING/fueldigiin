import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'
import { getAuthUser } from '@/lib/auth'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    const category = await Category.findById(params.id).lean()
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    const { name, description, color } = await request.json()

    const slug = name.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

    const category = await Category.findByIdAndUpdate(
      params.id,
      { name: name.trim(), slug, description, color },
      { new: true }
    )

    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 })
    }

    const category = await Category.findByIdAndDelete(params.id)
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}