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
        <div className="min-h-screen bg-slate-50 text-foreground font-sans flex flex-col">
            {/* Header */}
            <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent text-accent-foreground font-serif font-bold text-lg px-2 py-0.5 rounded shadow-sm">
                            iRev
                        </div>
                        <div className="hidden sm:block border-l border-primary-foreground/20 h-8 pl-4">
                            <h1 className="text-base font-bold">National Scholarship Exam</h1>
                            <div className="text-xs text-primary-foreground/70">{exam.subject}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className="hidden sm:flex bg-primary-foreground/10 text-white border-primary-foreground/20">
                            {answeredCount} of {exam.questions.length} Answered
                        </Badge>
                        <div className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-lg border border-primary-foreground/20">
                            <span className="text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider hidden sm:inline">Time Left</span>
                            <div className="font-mono text-lg font-bold text-accent">
                                <ExamTimer startTime={attempt.startTime} duration={exam.duration} onTimeUp={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-1 flex flex-col">
                <div className="grid gap-8 lg:grid-cols-12 max-w-6xl mx-auto w-full flex-1">

                    {/* Main Question Area */}
                    <div className="lg:col-span-8 flex flex-col">
                        <Card className="flex-1 shadow-sm border-slate-200 rounded-2xl overflow-hidden flex flex-col">
                            <div className="bg-white border-b border-slate-100 flex items-center justify-between px-8 py-4">
                                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                    Question {currentQuestion + 1}
                                </div>
                                {answers[question.id] !== undefined ? (
                                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 uppercase tracking-wider text-xs px-2 py-0.5 shadow-none border-none">Saved</Badge>
                                ) : (
                                    <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 uppercase tracking-wider text-xs px-2 py-0.5 shadow-none border-none">Pending</Badge>
                                )}
                            </div>

                            <CardHeader className="px-8 pt-8 pb-4 bg-white">
                                <CardTitle className="text-2xl font-serif text-slate-900 leading-relaxed">{question.text}</CardTitle>
                            </CardHeader>

                            <CardContent className="px-8 pb-8 flex-1 bg-white">
                                <div className="space-y-3 mt-4">
                                    {options.map((option: string, index: number) => {
                                        const isSelected = answers[question.id] === index;
                                        return (
                                            <button
                                                type="button"
                                                key={index}
                                                onClick={() => handleOptionSelect(question.id, index)}
                                                className={`w-full text-left p-5 rounded-xl border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                                                        ? 'bg-blue-50/50 border-primary text-slate-900 shadow-sm'
                                                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors ${isSelected
                                                            ? 'border-primary bg-primary text-white'
                                                            : 'border-slate-300 text-slate-500 bg-white'
                                                        }`}>
                                                        {String.fromCharCode(65 + index)}
                                                    </div>
                                                    <span className={`text-base sm:text-lg ${isSelected ? 'font-medium' : ''}`}>{option}</span>
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </CardContent>

                            {/* Navigation Footer */}
                            <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                    disabled={currentQuestion === 0}
                                    className="border-slate-300 text-slate-700 bg-white hover:bg-slate-100 h-12 px-6"
                                >
                                    Previous
                                </Button>

                                <div className="flex items-center gap-4">
                                    {currentQuestion < exam.questions.length - 1 ? (
                                        <Button
                                            size="lg"
                                            onClick={() => setCurrentQuestion(prev => Math.min(exam.questions.length - 1, prev + 1))}
                                            className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 shadow-md"
                                        >
                                            Next Question
                                        </Button>
                                    ) : (
                                        <Button
                                            size="lg"
                                            onClick={async () => {
                                                if (isSubmitting) return
                                                const ok = window.confirm('Are you sure you want to finish and submit your exam?')
                                                if (!ok) return
                                                await handleSubmit()
                                            }}
                                            disabled={isSubmitting}
                                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 px-10 shadow-lg"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Finish & Submit Exam'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>

                        {/* Mobile Question Navigator */}
                        <div className="mt-6 lg:hidden">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Question Navigator</h3>
                                <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                                    {exam.questions.map((q, idx) => {
                                        const isActive = idx === currentQuestion
                                        const isAnswered = answers[q.id] !== undefined
                                        return (
                                            <button
                                                key={q.id}
                                                type="button"
                                                onClick={() => setCurrentQuestion(idx)}
                                                className={`h-10 rounded-lg border-2 text-sm font-bold transition-colors ${isActive
                                                        ? 'bg-primary text-white border-primary shadow-sm'
                                                        : isAnswered
                                                            ? 'bg-accent/20 text-slate-900 border-accent/30 hover:border-accent'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {idx + 1}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Sidebar Navigator */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Question Navigator</h3>
                            <div className="grid grid-cols-5 gap-2 mt-4">
                                {exam.questions.map((q, idx) => {
                                    const isActive = idx === currentQuestion
                                    const isAnswered = answers[q.id] !== undefined
                                    return (
                                        <button
                                            key={q.id}
                                            type="button"
                                            onClick={() => setCurrentQuestion(idx)}
                                            className={`h-10 rounded-lg border-2 text-sm font-bold transition-colors ${isActive
                                                    ? 'bg-primary text-white border-primary shadow-sm'
                                                    : isAnswered
                                                        ? 'bg-accent/20 text-slate-900 border-accent/30 hover:border-accent'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    )
                                })}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-4 h-4 rounded border-2 border-primary bg-primary"></div>
                                    <span>Current Question</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-4 h-4 rounded border-2 border-accent/30 bg-accent/20"></div>
                                    <span>Answered</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <div className="w-4 h-4 rounded border-2 border-slate-200 bg-white"></div>
                                    <span>Unanswered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
