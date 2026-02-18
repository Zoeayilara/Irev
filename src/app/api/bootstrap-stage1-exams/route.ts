import { NextResponse } from 'next/server'
import { getCurrentUserId } from '@/lib/auth'
import { ensureDefaultStage1Exams } from '@/lib/default-exams'
import prisma from '@/lib/prisma'

export async function POST() {
  const userId = await getCurrentUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await ensureDefaultStage1Exams()
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}

export async function GET() {
  const userId = await getCurrentUserId()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await ensureDefaultStage1Exams()
    const exams = await prisma.exam.findMany({
      where: { stage: 1 },
      orderBy: [{ subject: 'asc' }],
      select: { id: true, subject: true, duration: true },
    })
    return NextResponse.json({ ok: true, exams })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
