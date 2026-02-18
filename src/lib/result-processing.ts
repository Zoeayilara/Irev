import prisma from "@/lib/prisma"

export async function processExamResult(attemptId: string) {
    const attempt = await prisma.attempt.findUnique({
        where: { id: attemptId },
        include: {
            exam: {
                include: { questions: true }
            },
            answers: true
        }
    })

    if (!attempt || !attempt.submitTime) {
        throw new Error("Invalid attempt for processing")
    }

    // Calculate Score
    let score = 0
    const totalQuestions = attempt.exam.questions.length

    attempt.answers.forEach(answer => {
        const question = attempt.exam.questions.find(q => q.id === answer.questionId)
        if (question && question.correctOption === answer.selectedOption) {
            score++
        }
    })

    const percentage = totalQuestions === 0 ? 0 : (score / totalQuestions) * 100

    // Update Attempt with Score
    await prisma.attempt.update({
        where: { id: attemptId },
        data: {
            score: percentage, // Store as percentage or raw score depending on requirements. Let's say percentage.
            isProcessed: false // Not yet released to user
        }
    })

    // Schedule Release (In a real system, this would be a separate job)
    // Here we just calculate the release time for reference
    const releaseTime = new Date(attempt.submitTime.getTime() + 24 * 60 * 60 * 1000)

    return { percentage, releaseTime }
}


// This function would be called by a cron job every hour
export async function releaseResults() {
    const now = new Date()

    // Find unprocessed attempts that are past their release time
    // Note: This query is a bit complex for standard Prisma without raw SQL if we want to do strict date math on DB side easily.
    // For MVP, we'll fetch unprocessed attempts and filter in code or use a raw query.
    // Let's use a simpler approach: fetch all unprocessed where submitTime < 24 hours ago.

    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const attemptsToRelease = await prisma.attempt.findMany({
        where: {
            isProcessed: false,
            status: "COMPLETED",
            OR: [
                {
                    resultReleaseAt: {
                        lte: now,
                    },
                },
                {
                    resultReleaseAt: null,
                    submitTime: {
                        lte: twentyFourHoursAgo,
                    },
                },
            ],
        },
        include: { user: true }
    })

    for (const attempt of attemptsToRelease) {
        // Release Logic
        await prisma.$transaction(async (tx) => {
            // 1. Mark as processed
            await tx.attempt.update({
                where: { id: attempt.id },
                data: { isProcessed: true }
            })

            // 2. Update User Stage if they passed
            // Assume 70% is pass mark
            if (attempt.score !== null && attempt.score >= 70) {
                await tx.user.update({
                    where: { id: attempt.userId },
                    data: { currentStage: { increment: 1 } }
                })
            }
        })
    }

    return attemptsToRelease.length
}
