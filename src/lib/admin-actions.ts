'use server'

import prisma from '@/lib/prisma'
import { requireAdminUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function createExam(formData: FormData) {
  await requireAdminUserId()

  const stageRaw = formData.get('stage')
  const subjectRaw = formData.get('subject')
  const durationRaw = formData.get('duration')

  const stage = Number(stageRaw)
  const subject = String(subjectRaw || '').trim()
  const duration = Number(durationRaw)

  if (!Number.isFinite(stage) || stage <= 0) {
    redirect('/admin?error=invalid_stage')
  }

  if (!subject) {
    redirect('/admin?error=invalid_subject')
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    redirect('/admin?error=invalid_duration')
  }

  const existing = await prisma.exam.findUnique({
    where: {
      stage_subject: {
        stage,
        subject,
      },
    },
    select: { id: true },
  })
  if (existing) {
    redirect('/admin?error=subject_exists')
  }

  await prisma.exam.create({
    data: {
      stage,
      subject,
      duration,
    },
  })

  redirect('/admin')
}

export async function createQuestion(formData: FormData) {
  await requireAdminUserId()

  const examId = formData.get('examId') as string
  const text = formData.get('text') as string
  const optionsRaw = formData.get('options') as string
  const correctOptionRaw = formData.get('correctOption')

  const correctOption = Number(correctOptionRaw)

  if (!examId || !text || !optionsRaw) {
    redirect('/admin?error=missing_fields')
  }

  if (!Number.isFinite(correctOption) || correctOption < 0) {
    redirect('/admin?error=invalid_correct')
  }

  const options = optionsRaw
    .split('\n')
    .map((o) => o.trim())
    .filter(Boolean)

  if (options.length < 2) {
    redirect('/admin?error=invalid_options')
  }

  if (correctOption >= options.length) {
    redirect('/admin?error=invalid_correct')
  }

  const exam = await prisma.exam.findUnique({ where: { id: examId }, select: { id: true } })
  if (!exam) {
    redirect('/admin?error=invalid_exam')
  }

  await prisma.question.create({
    data: {
      examId,
      text,
      options,
      correctOption,
    },
  })

  redirect('/admin')
}
