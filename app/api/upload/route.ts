import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { getAuthUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 400 })
    }

    // validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 5MB limit.' }, { status: 400 })
    }

    const now = new Date()
    const year = now.getFullYear().toString()
    const month = String(now.getMonth() + 1).padStart(2, '0')

    // build folder path: public/uploads/year/mm/
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', year, month)

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // sanitize filename, no timestamp
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase()
    const ext = path.extname(originalName)
    const baseName = path.basename(originalName, ext)
    let uniqueName = `${baseName}${ext}`

    // only add counter if file already exists
    let counter = 1
    while (existsSync(path.join(uploadDir, uniqueName))) {
      uniqueName = `${baseName}-${counter}${ext}`
      counter++
    }

    const filePath = path.join(uploadDir, uniqueName)
    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    // return public URL
    const url = `/uploads/${year}/${month}/${uniqueName}`

    return NextResponse.json({
      url,
      fileName: uniqueName,
      fileSize: file.size,
      fileType: file.type,
    }, { status: 200 })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}