import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, CheckCircle2, XCircle } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ScoreBreakdownPage() {
    const userId = await requireUserId()

    const attempts = await prisma.attempt.findMany({
        where: { userId },
        include: {
            exam: true,
            answers: {
                include: { question: true }
            }
        },
        orderBy: { createdAt: "desc" },
    })

    // Filter completed and processed
    const processedAttempts = attempts.filter(a => a.status === "COMPLETED" && a.isProcessed)

    return (
        <div className="w-full bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E2E8F0] animate-in fade-in duration-500">
            <header className="mb-8 border-b border-[#E2E8F0] pb-6">
                <h2 className="text-2xl font-serif font-bold text-[#0A192F] mb-1">Score Breakdown</h2>
                <p className="text-[#64748B]">Detailed analysis of your examination performance.</p>
            </header>

            {processedAttempts.length === 0 ? (
                <Card className="bg-[#F8FAFC] border-dashed border-2 border-[#E2E8F0] shadow-none">
                    <CardContent className="p-12 text-center text-[#64748B]">
                        <BarChart className="h-12 w-12 mx-auto mb-4 text-[#CBD5E1]" />
                        <p>No detailed breakdowns available yet. Complete an exam and wait for processing.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    {processedAttempts.map(attempt => {
                        // Calculate correct/incorrect manually for display
                        let correctCount = 0;
                        let incorrectCount = 0;
                        attempt.answers.forEach(ans => {
                            if (ans.question && ans.selectedOption === ans.question.correctOption) {
                                correctCount++;
                            } else {
                                incorrectCount++;
                            }
                        });

                        return (
                            <Card key={attempt.id} className="shadow-none border border-[#E2E8F0] bg-[#F8FAFC] rounded-xl overflow-hidden">
                                <CardHeader className="bg-[#0A192F] text-white p-6">
                                    <CardTitle className="flex justify-between items-center text-lg">
                                        <span>Stage {attempt.exam.stage} - {attempt.exam.subject}</span>
                                        <span className="text-[#F59E0B]">{attempt.score}%</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] text-center">
                                            <p className="text-xs text-[#64748B] font-bold uppercase mb-1">Questions</p>
                                            <p className="text-xl font-black text-[#1A233A]">{attempt.answers.length}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] text-center">
                                            <p className="text-xs text-[#64748B] font-bold uppercase mb-1">Correct</p>
                                            <p className="text-xl font-black text-[#10B981] flex items-center justify-center gap-1"><CheckCircle2 className="h-4 w-4" /> {correctCount}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] text-center">
                                            <p className="text-xs text-[#64748B] font-bold uppercase mb-1">Incorrect</p>
                                            <p className="text-xl font-black text-[#EF4444] flex items-center justify-center gap-1"><XCircle className="h-4 w-4" /> {incorrectCount}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg border border-[#E2E8F0]">
                                        <h4 className="text-sm font-bold text-[#0A192F] mb-4">Performance Insights</h4>
                                        <p className="text-sm text-[#64748B]">Detailed topic-by-topic analysis will be available once the full final examination series concludes. Your current overall proficiency for this stage is evaluated based on your final aggregate score.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
