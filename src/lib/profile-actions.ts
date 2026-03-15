'use server'

import prisma from '@/lib/prisma'
import { requireUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const userId = await requireUserId()

  const fullNameRaw = formData.get('fullName')
  const fullName = typeof fullNameRaw === 'string' ? fullNameRaw.trim() : null

  const phoneRaw = formData.get('phoneNumber')
  const phoneNumber = typeof phoneRaw === 'string' ? phoneRaw.trim() : null

  const academicLevelRaw = formData.get('academicLevel')
  const academicLevel = typeof academicLevelRaw === 'string' ? academicLevelRaw.trim() : null

  const schoolNameRaw = formData.get('schoolName')
  const schoolName = typeof schoolNameRaw === 'string' ? schoolNameRaw.trim() : null

  await prisma.user.update({
    where: { id: userId },
    data: {
      fullName: fullName || null,
      phoneNumber: phoneNumber || null,
      academicLevel: academicLevel || null,
      schoolName: schoolName || null,
    } as any,
  })

  redirect('/profile')
}

export async function updateDashboardProfile(formData: FormData) {
  const userId = await requireUserId()

  const fullNameRaw = formData.get('fullName')
  const fullName = typeof fullNameRaw === 'string' ? fullNameRaw.trim() : null

  const phoneRaw = formData.get('phoneNumber')
  const phoneNumber = typeof phoneRaw === 'string' ? phoneRaw.trim() : null

  const academicLevelRaw = formData.get('academicLevel')
  const academicLevel = typeof academicLevelRaw === 'string' ? academicLevelRaw.trim() : null

  const schoolNameRaw = formData.get('schoolName')
  const schoolName = typeof schoolNameRaw === 'string' ? schoolNameRaw.trim() : null

  await prisma.user.update({
    where: { id: userId },
    data: {
      fullName: fullName || null,
      phoneNumber: phoneNumber || null,
      academicLevel: academicLevel || null,
      schoolName: schoolName || null,
    } as any,
  })

  redirect('/dashboard/profile')
}
