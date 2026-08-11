import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Category from '@/models/Category'
import { getAuthUser } from '@/lib/auth'

export async function GET() {
  try {
    await dbConnect()
    const categories = await Category.find().sort({ name: 1 }).lean()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Fetch categories error:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const { name, description, color } = await request.json()

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

    const existing = await Category.findOne({ $or: [{ name }, { slug }] })
    if (existing) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 409 })
    }

    const category = await Category.create({ name: name.trim(), slug, description, color: color || '#870d23' })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Create category error:', error)
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}