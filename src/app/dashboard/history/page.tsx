import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import AnalyticsCharts from "@/components/dashboard/analytics-charts"
import { BarChart3, Trophy, FileText, CalendarDays } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function HistoryPage() {
    const userId = await requireUserId()
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { attempts: { include: { exam: true } } },
    })

    if (!user) return null

    const completedAttempts = user.attempts.filter(a => a.status === "COMPLETED" && a.isProcessed && a.score !== null)
    const bestScore = completedAttempts.length > 0 ? Math.max(...completedAttempts.map(a => a.score as number)) : 0
    const avgScore = completedAttempts.length > 0
        ? Math.round(completedAttempts.reduce((acc, curr) => acc + (curr.score as number), 0) / completedAttempts.length)
        : 0

    const daysToNextExam = 30

    const stageBuckets = new Map<number, number[]>()
    const subjectBuckets = new Map<string, number[]>()

    for (const a of completedAttempts) {
        stageBuckets.set(a.exam.stage, [...(stageBuckets.get(a.exam.stage) ?? []), a.score as number])
        subjectBuckets.set(a.exam.subject, [...(subjectBuckets.get(a.exam.subject) ?? []), a.score as number])
    }

    const performanceData = Array.from(stageBuckets.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([stage, scores]) => ({
            stage: `Stage ${stage}`,
            score: Math.round(scores.reduce((acc, s) => acc + s, 0) / scores.length),
        }))

    const subjectData = Array.from(subjectBuckets.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([subject, scores]) => ({
            subject,
            score: Math.round(scores.reduce((acc, s) => acc + s, 0) / scores.length),
            fullMark: 100,
        }))

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border border-[#E2E8F0] shadow-none rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center">
                            <FileText className="h-5 w-5 text-[#F59E0B]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#64748B] uppercase">Current Stage</p>
                            <p className="text-lg font-black text-[#0A192F]">Stage {user.currentStage}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-[#E2E8F0] shadow-none rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-[#F59E0B]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#64748B] uppercase">Best Score</p>
                            <p className="text-lg font-black text-[#0A192F]">{bestScore}%</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-[#E2E8F0] shadow-none rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                            <BarChart3 className="h-5 w-5 text-[#F59E0B]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#64748B] uppercase">Avg. Score</p>
                            <p className="text-lg font-black text-[#0A192F]">{avgScore}%</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white border border-[#E2E8F0] shadow-none rounded-2xl">
                    <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                            <CalendarDays className="h-5 w-5 text-[#F59E0B]" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#64748B] uppercase">Days to Exam</p>
                            <p className="text-lg font-black text-[#0A192F]">{daysToNextExam} days</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-6 shadow-none">
                <AnalyticsCharts performanceData={performanceData} subjectData={subjectData} />
            </div>
        </div>
    )
}
