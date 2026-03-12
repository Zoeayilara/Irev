import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { ensureDefaultStage1Exams } from "@/lib/default-exams"
import { Card, CardContent } from "@/components/ui/card"
import SubjectPicker from "@/components/dashboard/subject-picker"
import { Calendar, Clock, AlertCircle, MapPin, Bell, Trophy } from "lucide-react"
import { releaseResultsForUser } from "@/lib/result-processing"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const userId = await requireUserId()

  await releaseResultsForUser(userId)

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

  const pendingStageAttempt = user.attempts
    .filter((a) => a.exam.stage === user.currentStage && a.status === "COMPLETED" && !a.isProcessed && a.submitTime)
    .sort((a, b) => (b.submitTime?.getTime() ?? 0) - (a.submitTime?.getTime() ?? 0))[0]

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

  const now = new Date()
  const formatDateTime = (d: Date) =>
    d.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })

  const formatRelativeTime = (d: Date) => {
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return "just now"
    if (diffMin < 60) return `${diffMin} min ago`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr} hours ago`
    const diffDay = Math.floor(diffHr / 24)
    return `${diffDay} days ago`
  }

  const attemptNotifications = user.attempts
    .filter((a) => a.status === "ONGOING" || (a.status === "COMPLETED" && a.submitTime))
    .sort((a, b) => {
      const ta = a.status === "ONGOING" ? a.startTime.getTime() : (a.submitTime?.getTime() ?? 0)
      const tb = b.status === "ONGOING" ? b.startTime.getTime() : (b.submitTime?.getTime() ?? 0)
      return tb - ta
    })
    .slice(0, 3)

  const notifications = attemptNotifications.map((a) => {
    if (a.status === "ONGOING") {
      return {
        title: `You have an ongoing Stage ${a.exam.stage} exam (${a.exam.subject}).`,
        time: formatRelativeTime(a.startTime),
        variant: "highlight" as const,
      }
    }

    const submit = a.submitTime as Date
    const releaseAt = a.resultReleaseAt ?? new Date(submit.getTime() + 24 * 60 * 60 * 1000)

    if (!a.isProcessed && releaseAt.getTime() > now.getTime()) {
      return {
        title: `Your Stage ${a.exam.stage} result will be released on ${formatDateTime(releaseAt)}.`,
        time: formatRelativeTime(submit),
        variant: "highlight" as const,
      }
    }

    if (!a.isProcessed) {
      return {
        title: `Your Stage ${a.exam.stage} result is pending release.`,
        time: formatRelativeTime(submit),
        variant: "highlight" as const,
      }
    }

    return {
      title: `Your Stage ${a.exam.stage} result is now available.`,
      time: formatRelativeTime(submit),
      variant: "normal" as const,
    }
  })

  const stageScoreByStage = new Map<number, number>()
  for (const a of user.attempts) {
    if (a.status !== "COMPLETED" || !a.isProcessed || a.score === null) continue
    const prev = stageScoreByStage.get(a.exam.stage)
    const score = Math.round(a.score)
    if (prev === undefined || score > prev) stageScoreByStage.set(a.exam.stage, score)
  }

  const progressStages = [
    { number: 1, title: "Stage 1 - School Level" },
    { number: 2, title: "Stage 2 - LGA Level" },
    { number: 3, title: "Stage 3 - State Level" },
    { number: 4, title: "Stage 4 - State Level" },
    { number: 5, title: "Stage 5 - State Level" },
  ]

  return (
    <div className="space-y-10">
      {/* Upcoming Exam */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-[#0A192F]">
          <Calendar className="h-5 w-5 text-[#F59E0B]" />
          <h2 className="text-lg sm:text-xl font-bold">Upcoming Exam</h2>
        </div>

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
              {pendingStageAttempt?.submitTime ? (
                <div className="bg-white/60 rounded-xl p-4 inline-block border border-amber-200/50 mb-4">
                  <p className="text-sm font-semibold text-amber-900">Results will be released</p>
                  <p className="text-xs text-amber-700 mt-1">
                    {formatDateTime(
                      pendingStageAttempt.resultReleaseAt ??
                        new Date(pendingStageAttempt.submitTime.getTime() + 24 * 60 * 60 * 1000)
                    )}
                  </p>
                </div>
              ) : null}
              <div className="bg-white/60 rounded-xl p-4 inline-block border border-amber-200/50">
                <p className="text-sm font-semibold text-amber-900">Processing Time Protocol</p>
                <p className="text-xs text-amber-700 mt-1">Results are officially released exactly 24 hours post-submission to ensure cheating audits are completed.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-[#E2E8F0] bg-white shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0A192F]">Stage {user.currentStage} - State Level</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#F59E0B]" />
                    <span>Date: Saturday, March 22, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#F59E0B]" />
                    <span>Venue: Lagos State Examination Hall, Ikeja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#F59E0B]" />
                    <span>Time: 10:00 AM WAT</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#0A192F] mb-3">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {stageExams.slice(0, 10).map((e) => (
                      <span
                        key={e.id}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] text-[#0A192F]"
                      >
                        {e.subject}
                      </span>
                    ))}
                    {stageExams.length === 0 ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] text-[#0A192F]">No subjects yet</span>
                    ) : null}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    className="w-full max-w-xl mx-auto block h-12 rounded-md bg-[#F59E0B] hover:bg-[#E08F00] text-[#0A192F] font-bold text-sm shadow-sm transition-colors"
                  >
                    Access Practice Materials
                  </button>
                </div>
              </div>

              <div className="mt-8">
                {stageExams.length === 0 ? null : (
                  <div className="hidden">
                    <SubjectPicker exams={stageExams} ongoingExamId={ongoingStageAttempt?.examId || null} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Recent Notifications */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-[#0A192F]">
          <Bell className="h-5 w-5 text-[#F59E0B]" />
          <h2 className="text-lg sm:text-xl font-bold">Recent Notifications</h2>
        </div>

        <div className="space-y-4">
          {notifications.map((n, idx) => (
            <Card
              key={idx}
              className={
                n.variant === "highlight"
                  ? "bg-[#FEF3C7]/40 border border-[#FDE68A] shadow-none rounded-2xl"
                  : "bg-white border border-[#E2E8F0] shadow-none rounded-2xl"
              }
            >
              <CardContent className="p-6 flex items-start gap-4">
                <div className={n.variant === "highlight" ? "mt-1 w-2 h-2 rounded-full bg-[#F59E0B]" : "mt-1 w-2 h-2 rounded-full bg-[#94A3B8]"} />
                <div>
                  <p className="font-semibold text-[#0A192F] text-sm">{n.title}</p>
                  <p className="text-xs text-[#64748B] mt-1">{n.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {notifications.length === 0 ? (
            <Card className="bg-white border border-[#E2E8F0] shadow-none rounded-2xl">
              <CardContent className="p-6 text-sm text-[#64748B]">No notifications yet.</CardContent>
            </Card>
          ) : null}
        </div>
      </section>

      {/* Competition Stage Progress */}
      <section className="space-y-4">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-[#0A192F]">
            <Trophy className="h-5 w-5 text-[#F59E0B]" />
            <h2 className="text-lg sm:text-xl font-bold">Competition Stage Progress</h2>
          </div>
          <p className="text-sm text-[#64748B] mt-1">Track your journey through all 5 stages</p>
        </div>

        <Card className="bg-white border border-[#E2E8F0] shadow-none rounded-2xl">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {progressStages.map((s) => {
              const isPassed = user.currentStage > s.number
              const isCurrent = user.currentStage === s.number
              const isLocked = user.currentStage < s.number
              const stageScore = stageScoreByStage.get(s.number)

              return (
                <div key={s.number} className="flex items-start gap-4">
                  <div
                    className={
                      isPassed
                        ? "w-7 h-7 rounded-full bg-[#F59E0B] text-[#0A192F] flex items-center justify-center text-xs font-bold"
                        : isCurrent
                          ? "w-7 h-7 rounded-full bg-[#0A192F] text-white flex items-center justify-center text-xs font-bold"
                          : "w-7 h-7 rounded-full bg-[#E5E7EB] text-[#64748B] flex items-center justify-center text-xs font-bold"
                    }
                  >
                    {s.number}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className={isCurrent ? "font-bold text-[#0A192F] text-sm" : "font-semibold text-[#0A192F] text-sm"}>{s.title}</p>
                        {stageScore !== undefined ? (
                          <p className="text-xs text-[#64748B]">Score: {stageScore}%</p>
                        ) : (
                          <p className="text-xs text-[#64748B]">&nbsp;</p>
                        )}
                      </div>

                      {isPassed ? (
                        <div className="flex items-center gap-3">
                          {stageScore !== undefined ? (
                            <span className="text-xs font-bold text-[#F59E0B]">{stageScore}%</span>
                          ) : null}
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A]">Passed</span>
                        </div>
                      ) : isCurrent ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#E2E8F0] text-[#0A192F]">Upcoming</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B] text-[#0A192F]">Locked</span>
                      )}
                    </div>

                    <div className="mt-3 h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
                      <div
                        className={isPassed ? "h-full bg-[#F59E0B]" : isCurrent ? "h-full bg-[#0A192F]" : "h-full bg-transparent"}
                        style={
                          isPassed
                            ? { width: `${Math.max(0, Math.min(100, stageScore ?? 100))}%` }
                            : isCurrent
                              ? { width: "50%" }
                              : { width: "0%" }
                        }
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
