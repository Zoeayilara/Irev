import { NextResponse } from 'next/server'
import crypto from 'crypto'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import prisma from '@/lib/prisma'
import { getCurrentUserId } from '@/lib/auth'

export async function POST(req: Request) {
  const userId = await getCurrentUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('avatar')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg'
  const filename = `${crypto.randomBytes(16).toString('hex')}.${ext}`

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'avatars')
  await mkdir(uploadsDir, { recursive: true })

  const filePath = path.join(uploadsDir, filename)
  await writeFile(filePath, buffer)

  const url = `/uploads/avatars/${filename}`
  await prisma.user.update({ where: { id: userId }, data: { avatarUrl: url } })

  return NextResponse.json({ url })
}
