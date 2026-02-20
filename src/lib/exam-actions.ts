'use server'

import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { requireUserId } from "@/lib/auth"

export async function startExam(examId: string) {
    const userId = await requireUserId()

    const exam = await prisma.exam.findUnique({
        where: { id: examId },
        select: { duration: true },
    })

    if (!exam) {
        throw new Error("Exam not found")
    }

    // Check if active attempt exists
    const existingAttempt = await prisma.attempt.findFirst({
        where: {
            userId,
            examId,
            status: "ONGOING"
        }
    })

    if (existingAttempt) {
        return existingAttempt
    }

    // Create new attempt
    const now = new Date()
    const expiresAt = new Date(now.getTime() + exam.duration * 1000)
    const attempt = await prisma.attempt.create({
        data: {
            userId,
            examId,
            startTime: now,
            expiresAt,
            status: "ONGOING"
        }
    })

    return attempt
}

export async function submitExam(attemptId: string, answers: Record<string, number>) {
    const userId = await requireUserId()

    const attempt = await prisma.attempt.findUnique({
        where: { id: attemptId },
        include: {
            exam: { include: { questions: true } },
        }
    })

    if (!attempt) throw new Error("Attempt not found")
    if (attempt.userId !== userId) throw new Error("Forbidden")
    if (attempt.status === "COMPLETED") {
        redirect("/dashboard")
    }

    const now = new Date()
    const startTime = new Date(attempt.startTime)
    const duration = attempt.exam.duration * 1000 // ms
    const buffer = 10000 // 10s buffer
    const expiresAt = attempt.expiresAt ? new Date(attempt.expiresAt) : new Date(startTime.getTime() + duration)

    // Server-side Timer Validation
    if (now.getTime() > expiresAt.getTime() + buffer) {
        // Late submission handling - could reject or mark as late
        // For now, we accept but flag it, or strictly reject.
        // Let's accept but user might get 0 if logic dictates.
        console.log("Late submission")
    }

    const totalQuestions = attempt.exam.questions.length
    let correct = 0
    for (const question of attempt.exam.questions) {
        const selected = answers[question.id]
        if (typeof selected === 'number' && question.correctOption === selected) {
            correct++
        }
    }
    const scorePercent = totalQuestions === 0 ? 0 : (correct / totalQuestions) * 100
    const resultReleaseAt = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    await prisma.$transaction(async (tx) => {
        for (const [questionId, selectedOption] of Object.entries(answers)) {
            await tx.answer.upsert({
                where: {
                    attemptId_questionId: {
                        attemptId,
                        questionId,
                    },
                },
                create: {
                    attemptId,
                    questionId,
                    selectedOption,
                },
                update: {
                    selectedOption,
                },
            })
        }

        await tx.attempt.update({
            where: { id: attemptId },
            data: {
                submitTime: now,
                status: "COMPLETED",
                score: scorePercent,
                resultReleaseAt,
                isProcessed: false,
            },
        })
    })

    redirect("/dashboard")
}

export async function getExamById(examId: string) {
    const exam = await prisma.exam.findUnique({
        where: { id: examId },
        include: { questions: true },
    })
    return exam
}
