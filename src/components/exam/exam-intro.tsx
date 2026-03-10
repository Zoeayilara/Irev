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
        <div className="min-h-screen bg-slate-50 text-foreground flex items-center justify-center font-sans">
            <div className="container mx-auto px-4 py-10 flex items-center justify-center">
                <Card className="w-full max-w-xl border-none shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <div className="bg-primary text-primary-foreground p-8 text-center border-b border-primary/20">
                        <div className="inline-block bg-accent text-accent-foreground font-serif font-bold text-2xl px-3 py-1 rounded shadow-sm mb-4">
                            iRev
                        </div>
                        <CardTitle className="text-3xl font-serif mb-2">Ready to Begin?</CardTitle>
                        <CardDescription className="text-primary-foreground/80 text-base">
                            Subject: <span className="font-bold text-white">{subject}</span>.
                            <br />
                            Once you click start, the <span className="font-bold text-accent">{Math.floor(duration / 60)} minute</span> timer begins and cannot be paused.
                        </CardDescription>
                    </div>
                    <CardContent className="space-y-6 p-8 bg-white">
                        <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-900 shadow-sm">
                            <div className="font-bold text-base mb-2 flex items-center gap-2">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-200 text-red-700 text-xs">!</span>
                                Strict Exam Rules
                            </div>
                            <ul className="mt-2 space-y-2 list-disc list-inside text-red-800/80 marker:text-red-400">
                                <li>Do <span className="font-bold">not</span> refresh the page.</li>
                                <li>Do <span className="font-bold">not</span> switch tabs (your session is monitored).</li>
                                <li>Right-click and copy-paste are strictly disabled.</li>
                            </ul>
                        </div>

                        <Button
                            onClick={handleStart}
                            disabled={isLoading}
                            className="w-full h-14 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                        >
                            {isLoading ? 'Preparing Exam Environment...' : 'Start Exam Now'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
