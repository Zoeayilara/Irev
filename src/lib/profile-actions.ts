'use server'

import prisma from '@/lib/prisma'
import { requireUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const userId = await requireUserId()

  const fullNameRaw = formData.get('fullName')
  const fullName = typeof fullNameRaw === 'string' ? fullNameRaw.trim() : null

  await prisma.user.update({
    where: { id: userId },
    data: {
      fullName: fullName || null,
    },
  })

  redirect('/profile')
}
