'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { startExam } from '@/lib/exam-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ExamIntro({
    examId,
    duration,
    subject,
}: {
    examId: string
    duration: number
    subject: string
}) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleStart = async () => {
        setIsLoading(true)
        try {
            await startExam(examId)
            router.refresh() // Refresh to show the ExamInterface
        } catch (error) {
            console.error("Failed to start exam", error)
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-10 flex items-center justify-center">
                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <CardTitle>Ready to Begin?</CardTitle>
                        <CardDescription>
                            Subject: <span className="font-semibold text-foreground">{subject}</span>. Once you click start, the <span className="font-semibold text-foreground">{Math.floor(duration / 60)} minute</span> timer begins and cannot be paused.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-md border border-border bg-muted p-4 text-sm text-slate-700 dark:text-slate-200">
                            <div className="font-semibold">Exam Rules</div>
                            <div className="mt-2 grid gap-1">
                                <div>Do not refresh the page.</div>
                                <div>Do not switch tabs (it is monitored).</div>
                                <div>Right-click and copy-paste are disabled.</div>
                            </div>
                        </div>

                        <Button
                            onClick={handleStart}
                            disabled={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Starting Exam...' : 'Start Exam Now'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
