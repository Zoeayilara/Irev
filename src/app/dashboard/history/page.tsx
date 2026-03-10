import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { History, Clock } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
    const userId = await requireUserId()
    const attempts = await prisma.attempt.findMany({
        where: { userId },
        include: { exam: true },
        orderBy: { submitTime: 'desc' }
    })

    // Filter out ONGOING attempts to only show completed/processed
    const visibleAttempts = attempts.filter(a => a.status === "COMPLETED")

    return (
        <div className="w-full bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E2E8F0] animate-in fade-in duration-500">
            <header className="mb-8 border-b border-[#E2E8F0] pb-6">
                <h2 className="text-2xl font-serif font-bold text-[#0A192F] mb-1">Exam History</h2>
                <p className="text-[#64748B]">Review your past examination attempts and scores.</p>
            </header>

            {visibleAttempts.length === 0 ? (
                <Card className="bg-[#F8FAFC] border-dashed border-2 border-[#E2E8F0] shadow-none">
                    <CardContent className="p-12 text-center text-[#64748B]">
                        <History className="h-12 w-12 mx-auto mb-4 text-[#CBD5E1]" />
                        <p>No exams have been completed yet.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {visibleAttempts.map(attempt => (
                        <Card key={attempt.id} className="overflow-hidden shadow-none border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors rounded-xl">
                            <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                                <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                                    <History className="h-8 w-8 text-[#0A192F]" />
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-[#1A233A] mb-1">{attempt.exam.subject}</h3>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm mt-2">
                                        <span className="inline-flex items-center gap-1 bg-[#E0E7FF] text-[#4338CA] px-2 py-0.5 rounded-md font-bold text-xs"><Clock className="h-3 w-3" /> Stage {attempt.exam.stage}</span>
                                        <span className="text-[#64748B]">Submitted: {attempt.submitTime ? attempt.submitTime.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Pending'}</span>
                                    </div>
                                </div>
                                <div className="text-center sm:text-right sm:border-l sm:pl-6 border-[#E2E8F0] mt-4 sm:mt-0 w-full sm:w-auto">
                                    <p className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1">Final Score</p>
                                    {attempt.isProcessed && attempt.score !== null ? (
                                        <span className="text-3xl font-black text-[#10B981]">{attempt.score}%</span>
                                    ) : (
                                        <span className="inline-block bg-[#FEF3C7] text-[#92400E] text-xs font-bold px-3 py-1 rounded-full border border-[#FCD34D]">PROCESSING</span>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
