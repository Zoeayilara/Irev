import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { ensureDefaultStage1Exams } from "@/lib/default-exams"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SubjectPicker from "@/components/dashboard/subject-picker"
import AnalyticsCharts from "@/components/dashboard/analytics-charts"
import { FileText, Calendar, Trophy, Clock, AlertCircle, MapPin } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const userId = await requireUserId()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { attempts: { include: { exam: true } } },
  })

  if (!user) {
    return null
  }

  // Auto-progress from Stage 0 to 1
  if (user.currentStage === 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { currentStage: 1 },
    })
    redirect("/dashboard")
  }

  const pendingAttempt = user.attempts.some(
    (a) => a.exam.stage === user.currentStage && a.status === "COMPLETED" && !a.isProcessed
  )

  if (user.currentStage === 1) {
    await ensureDefaultStage1Exams()
  }

  const stageExams = await prisma.exam.findMany({
    where: { stage: user.currentStage },
    orderBy: [{ subject: "asc" }],
    select: { id: true, subject: true, duration: true },
  })

  const ongoingStageAttempt = await prisma.attempt.findFirst({
    where: {
      userId: user.id,
      status: "ONGOING",
      exam: { stage: user.currentStage },
    },
    select: { examId: true },
  })

  // Calculate mock stats for UI display based on past attempts
  const completedAttempts = user.attempts.filter(a => a.status === "COMPLETED" && a.isProcessed && a.score !== null);
  const bestScore = completedAttempts.length > 0 ? Math.max(...completedAttempts.map(a => a.score as number)) : 0;
  const avgScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((acc, curr) => acc + (curr.score as number), 0) / completedAttempts.length)
    : 0;

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Welcome back, {user.fullName ? user.fullName.split(' ')[0] : 'Candidate'}!</h1>
          <p className="text-slate-600">Here's your academic performance and upcoming schedule.</p>
        </header>

        {/* Performance Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
              <Trophy size={100} className="text-primary" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 text-uppercase tracking-wider">Current Stage</p>
                  <h3 className="text-3xl font-bold text-slate-900">Stage {user.currentStage}</h3>
                </div>
              </div>
              <div className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs">Active phase</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
              <Trophy size={100} className="text-accent" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 text-accent flex items-center justify-center">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 text-uppercase tracking-wider">Best Score</p>
                  <h3 className="text-3xl font-bold text-slate-900">{bestScore}%</h3>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-500 flex items-center gap-1">
                Overall top performance
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
              <FileText size={100} className="text-slate-900" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 text-uppercase tracking-wider">Average Score</p>
                  <h3 className="text-3xl font-bold text-slate-900">{avgScore}%</h3>
                </div>
              </div>
              <div className="text-sm font-medium text-slate-500 flex items-center gap-1">
                Across all completed stages
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content - Upcoming Exam */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Action Required</h2>

          {pendingAttempt ? (
            <Card className="border border-amber-200 bg-amber-50 shadow-sm rounded-2xl overflow-hidden">
              <div className="bg-amber-100 px-6 py-4 border-b border-amber-200 flex items-center gap-3 text-amber-800">
                <Clock className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Results Pending Processing</h3>
              </div>
              <CardContent className="p-8 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-amber-900 mb-4">Exam Submitted Successfully</h4>
                <p className="text-amber-800/80 mb-6 text-lg">
                  Your Stage {user.currentStage} exam results are currently being processed by the iRev automated system.
                </p>
                <div className="bg-white/60 rounded-xl p-4 inline-block border border-amber-200/50">
                  <p className="text-sm font-semibold text-amber-900">Processing Time Protocol</p>
                  <p className="text-xs text-amber-700 mt-1">Results are officially released exactly 24 hours post-submission to ensure cheating audits are completed.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white">
              <div className="bg-slate-50 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-800">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Upcoming Examination: Stage {user.currentStage}</h3>
                </div>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">ACTIVE</span>
              </div>
              <CardContent className="p-0 sm:flex">
                <div className="p-6 sm:p-8 sm:w-1/2 border-b sm:border-b-0 sm:border-r border-slate-100">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Exam Details</h4>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <MapPin className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Venue</p>
                        <p className="font-semibold text-slate-900">Virtual Exam Hall (Online)</p>
                        <p className="text-xs text-slate-500 mt-1">Secure proctored environment</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <Clock className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">Duration & Rules</p>
                        <p className="font-semibold text-slate-900">30 Minutes Strictly</p>
                        <p className="text-xs text-slate-500 mt-1">Timer syncs with server. Auto-submits.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8 sm:w-1/2 bg-slate-50/50">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Subject Selection</h4>
                  <p className="text-sm text-slate-600 mb-6">Select your registered subject below to enter the secure exam hall. Ensure you have a stable internet connection before beginning.</p>

                  {stageExams.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                      No subjects configured for this stage yet.
                    </div>
                  ) : (
                    <SubjectPicker exams={stageExams} ongoingExamId={ongoingStageAttempt?.examId || null} />
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Performance Analytics Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Detailed Analytics</h2>
          <p className="text-slate-600 mb-6">Visual breakdown of your academic progress.</p>
          <AnalyticsCharts />
        </div>

      </div>
    </div>
  )
}
