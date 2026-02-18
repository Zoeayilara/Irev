import { redirect } from "next/navigation"
import Link from "next/link"
import prisma from "@/lib/prisma"
import { logout } from "@/lib/actions"
import { requireUserId } from "@/lib/auth"
import { ensureDefaultStage1Exams } from "@/lib/default-exams"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SubjectPicker from "@/components/dashboard/subject-picker"

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const userId = await requireUserId()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { attempts: { include: { exam: true } } }
  })

  if (!user) {
    redirect("/login")
  }

  if (user.currentStage === 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { currentStage: 1 },
    })
    redirect("/")
  }

  const pendingAttempt = user.attempts.some(a => a.exam.stage === user.currentStage && a.status === "COMPLETED" && !a.isProcessed)

  if (user.currentStage === 1) {
    await ensureDefaultStage1Exams()
  }

  let stageExams = await prisma.exam.findMany({
    where: { stage: user.currentStage },
    orderBy: [{ subject: "asc" }],
    select: { id: true, subject: true, duration: true },
  })

  if (user.currentStage === 1) {
    const preferred = stageExams.filter((e) => e.subject === 'Mathematics' || e.subject === 'English')
    if (preferred.length > 0) {
      stageExams = preferred
    }
  }

  const ongoingStageAttempt = await prisma.attempt.findFirst({
    where: {
      userId: user.id,
      status: "ONGOING",
      exam: { stage: user.currentStage },
    },
    select: { examId: true },
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-bold">Irev</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-600 dark:text-slate-300">{user.fullName || user.email.split('@')[0]}</span>
            <Link href="/profile" className="text-sm text-slate-700 hover:underline dark:text-slate-200">Profile</Link>
            {user.role === "ADMIN" && (
              <Link href="/admin" className="text-sm text-slate-700 hover:underline dark:text-slate-200">Admin</Link>
            )}
            <form action={logout}>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>My Dashboard</CardTitle>
              <CardDescription>
                Current Stage: <span className="font-mono bg-muted px-2 py-1 rounded">Stage {user.currentStage}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Account</div>
                <div className="mt-2 text-sm">{user.fullName || user.email}</div>
              </div>
              <div className="rounded-md border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Status</div>
                <div className="mt-2">
                  {pendingAttempt ? (
                    <Badge variant="warning">Result Pending (24h)</Badge>
                  ) : (
                    <Badge variant="success">Active</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>What you can do right now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.currentStage >= 1 && !pendingAttempt ? (
                stageExams.length === 0 ? (
                  <div className="rounded-md border border-border bg-muted p-4 text-sm text-slate-700 dark:text-slate-300">
                    No subjects configured yet. Contact an administrator.
                  </div>
                ) : (
                  <SubjectPicker exams={stageExams} ongoingExamId={ongoingStageAttempt?.examId || null} />
                )
              ) : (
                <Button disabled className="w-full">Exam Hall Closed</Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
