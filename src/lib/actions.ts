'use server'

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { createSession, deleteCurrentSession, hashPassword, verifyPassword } from "@/lib/auth"

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        redirect("/login?error=missing")
    }

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, passwordHash: true, currentStage: true },
    })

    if (!user) {
        redirect("/login?error=invalid")
    }

    if (!user.passwordHash) {
        redirect("/register?error=reset")
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
        redirect("/login?error=invalid")
    }

    if (user.currentStage === 0) {
        await prisma.user.update({
            where: { id: user.id },
            data: { currentStage: 1 },
        })
    }

    await createSession(user.id)
    redirect("/dashboard")
}

export async function register(formData: FormData) {
    const fullName = (formData.get("fullName") as string) || null
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!email || !password) {
        redirect("/register?error=missing")
    }

    if (confirmPassword && password !== confirmPassword) {
        redirect("/register?error=nomatch")
    }

    const passwordHash = await hashPassword(password)
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true, passwordHash: true } })

    const user = existing
        ? existing.passwordHash
            ? null
            : await prisma.user.update({
                where: { id: existing.id },
                data: {
                    fullName,
                    passwordHash,
                },
                select: { id: true },
            })
        : await prisma.user.create({
            data: {
                fullName,
                email,
                passwordHash,
                role: "CANDIDATE",
                currentStage: 1,
            },
            select: { id: true },
        })

    if (!user) {
        redirect("/register?error=exists")
    }

    await createSession(user.id)
    redirect("/dashboard")
}

export async function logout() {
    await deleteCurrentSession()
    redirect("/login")
}
