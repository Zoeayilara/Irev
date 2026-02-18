'use client'

import { useState } from 'react'
import { submitExam } from '@/lib/exam-actions'
import ExamTimer from './timer'
import { useExamSecurity } from './use-exam-security'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Define types locally for now, should invoke from Prisma types ideally
type Question = {
    id: string
    text: string
    options: unknown
}

type ExamInterfaceProps = {
    exam: {
        id: string
        subject: string
        duration: number
        questions: Question[]
    }
    attempt: {
        id: string
        startTime: Date
    }
}

export default function ExamInterface({ exam, attempt }: ExamInterfaceProps) {
    useExamSecurity()

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleOptionSelect = (questionId: string, optionIndex: number) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }))
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            await submitExam(attempt.id, answers)
        } catch (error) {
            console.error("Submission failed", error)
            setIsSubmitting(false)
        }
    }

    const question = exam.questions[currentQuestion]
    // Parse options if they are stored as JSON string, otherwise assume array
    const options = Array.isArray(question.options) ? question.options : JSON.parse(question.options as string)

    const answeredCount = Object.keys(answers).length

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold">Exam Hall</h1>
                            <div className="text-xs text-slate-600 dark:text-slate-300">{exam.subject}</div>
                        </div>
                        <Badge variant="outline">Answered {answeredCount}/{exam.questions.length}</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-600 dark:text-slate-300 text-sm">Time Remaining</span>
                        <ExamTimer startTime={attempt.startTime} duration={exam.duration} onTimeUp={handleSubmit} />
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Card>
                            <CardHeader className="space-y-2">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm text-slate-600 dark:text-slate-300 uppercase tracking-wide">Question {currentQuestion + 1} of {exam.questions.length}</div>
                                    {answers[question.id] !== undefined ? (
                                        <Badge variant="success">Answered</Badge>
                                    ) : (
                                        <Badge variant="outline">Not answered</Badge>
                                    )}
                                </div>
                                <CardTitle className="text-2xl">{question.text}</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                {options.map((option: string, index: number) => (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => handleOptionSelect(question.id, index)}
                                        className={`w-full text-left p-4 rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                                            answers[question.id] === index
                                                ? 'bg-primary text-primary-foreground border-primary/30 shadow-sm'
                                                : 'bg-card border-border hover:bg-muted'
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm font-semibold ${
                                                answers[question.id] === index ? 'border-primary-foreground/70 text-primary-foreground' : 'border-border text-slate-500'
                                            }`}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className="text-base sm:text-lg">{option}</span>
                                        </div>
                                    </button>
                                ))}

                                <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                        disabled={currentQuestion === 0}
                                    >
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-3">
                                        {currentQuestion < exam.questions.length - 1 ? (
                                            <Button
                                                onClick={() => setCurrentQuestion(prev => Math.min(exam.questions.length - 1, prev + 1))}
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={async () => {
                                                    if (isSubmitting) return
                                                    const ok = window.confirm('Submit your exam now?')
                                                    if (!ok) return
                                                    await handleSubmit()
                                                }}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit Exam'}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="mt-6 lg:hidden">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Questions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                                        {exam.questions.map((q, idx) => {
                                            const isActive = idx === currentQuestion
                                            const isAnswered = answers[q.id] !== undefined
                                            return (
                                                <button
                                                    key={q.id}
                                                    type="button"
                                                    onClick={() => setCurrentQuestion(idx)}
                                                    className={`h-10 rounded-md border text-xs font-semibold ${
                                                        isActive
                                                            ? 'bg-primary text-primary-foreground border-primary/30'
                                                            : isAnswered
                                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-900/50'
                                                                : 'bg-card text-foreground border-border hover:bg-muted'
                                                    }`}
                                                >
                                                    {idx + 1}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Questions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-5 gap-2">
                                    {exam.questions.map((q, idx) => {
                                        const isActive = idx === currentQuestion
                                        const isAnswered = answers[q.id] !== undefined
                                        return (
                                            <button
                                                key={q.id}
                                                type="button"
                                                onClick={() => setCurrentQuestion(idx)}
                                                className={`h-10 rounded-md border text-xs font-semibold ${
                                                    isActive
                                                        ? 'bg-primary text-primary-foreground border-primary/30'
                                                        : isAnswered
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-900/50'
                                                            : 'bg-card text-foreground border-border hover:bg-muted'
                                                }`}
                                            >
                                                {idx + 1}
                                            </button>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
