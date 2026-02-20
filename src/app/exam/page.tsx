import Link from "next/link"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import ExamInterface from "@/components/exam/exam-interface"
import ExamIntro from "@/components/exam/exam-intro"

export const dynamic = 'force-dynamic'

export default async function ExamPage({
    searchParams,
}: {
    searchParams?: Promise<{ examId?: string | string[] }> | { examId?: string | string[] }
}) {
    const userId = await requireUserId()

    const user = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (user?.currentStage === 0) {
        await prisma.user.update({ where: { id: userId }, data: { currentStage: 1 } })
        redirect('/dashboard')
    }

    // Only allow Stage 1 for now (Prototype Scope)
    if (!user || user.currentStage !== 1) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">You are not eligible for this exam stage.</p>
                    <Link href="/dashboard" className="mt-6 inline-block text-primary hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        )
    }

    const resolvedSearchParams = await Promise.resolve(searchParams)
    const rawExamId = resolvedSearchParams?.examId
    const examId = Array.isArray(rawExamId) ? rawExamId[0] : rawExamId
    const anyOngoingStageAttempt = await prisma.attempt.findFirst({
        where: {
            userId: user.id,
            status: "ONGOING",
            exam: {
                stage: user.currentStage,
            },
        },
        select: { examId: true },
    })

    if (!examId) {
        if (anyOngoingStageAttempt?.examId) {
            redirect(`/exam?examId=${anyOngoingStageAttempt.examId}`)
        }

        const firstExam = await prisma.exam.findFirst({
            where: { stage: user.currentStage },
            orderBy: [{ subject: 'asc' }],
            select: { id: true },
        })

        if (firstExam?.id) {
            redirect(`/exam?examId=${firstExam.id}`)
        }

        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold">Select a Subject</h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">Go back to your dashboard and pick a subject to begin.</p>
                    <Link href="/dashboard" className="mt-6 inline-block text-primary hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        )
    }

    if (anyOngoingStageAttempt && anyOngoingStageAttempt.examId !== examId) {
        redirect(`/exam?examId=${anyOngoingStageAttempt.examId}`)
    }

    const exam = await prisma.exam.findUnique({
        where: { id: examId },
        include: { questions: true },
    })

    if (!exam) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <p>Exam configuration not found. Please contact admin.</p>
            </div>
        )
    }

    if (exam.stage !== user.currentStage) {
        return (
            <div className="flex h-screen items-center justify-center bg-background text-foreground">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-300">This exam does not match your current stage.</p>
                    <Link href="/dashboard" className="mt-6 inline-block text-primary hover:underline">Return to Dashboard</Link>
                </div>
            </div>
        )
    }

    // Check for active attempt
    const attempt = await prisma.attempt.findFirst({
        where: {
            userId: user.id,
            examId: exam.id
        }
    })

    if (attempt) {
        if (attempt.status === "COMPLETED") {
            return (
                <div className="flex h-screen items-center justify-center bg-background text-foreground">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-emerald-500">Exam Completed</h1>
                        <p className="mt-4 text-slate-600 dark:text-slate-300">You have already submitted this exam.</p>
                        <Link href="/dashboard" className="mt-6 inline-block px-6 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-95">Go to Dashboard</Link>
                    </div>
                </div>
            )
        }
        // Resume/Continue Exam
        return <ExamInterface exam={exam} attempt={attempt} />
    }

    // No attempt yet, show intro
    return <ExamIntro examId={exam.id} duration={exam.duration} subject={exam.subject} />
}
