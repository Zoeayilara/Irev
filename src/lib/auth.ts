'use server'

import crypto from 'crypto'
import { promisify } from 'util'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

const scrypt = promisify(crypto.scrypt)

const SESSION_COOKIE_NAME = 'session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7

function sha256Hex(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, keyHex] = stored.split(':')
  if (!salt || !keyHex) return false

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  const storedKey = Buffer.from(keyHex, 'hex')
  if (storedKey.length !== derivedKey.length) return false

  return crypto.timingSafeEqual(storedKey, derivedKey)
}

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString('hex')
  const tokenHash = sha256Hex(token)
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  })
}

export async function deleteCurrentSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (token) {
    const tokenHash = sha256Hex(token)
    await prisma.session.deleteMany({ where: { tokenHash } })
  }

  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getCurrentUserId() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  const tokenHash = sha256Hex(token)
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    select: { userId: true, expiresAt: true },
  })

  if (!session || session.expiresAt.getTime() <= Date.now()) {
    cookieStore.delete(SESSION_COOKIE_NAME)
    if (session) {
      await prisma.session.deleteMany({ where: { tokenHash } })
    }
    return null
  }

  return session.userId
}

export async function requireUserId() {
  const userId = await getCurrentUserId()
  if (!userId) redirect('/login')
  return userId
}

export async function requireAdminUserId() {
  const userId = await requireUserId()
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } })
  if (!user || user.role !== 'ADMIN') redirect('/dashboard')
  return userId
}
