import Link from "next/link"
import prisma from "@/lib/prisma"
import { requireAdminUserId } from "@/lib/auth"
import { createExam, createQuestion } from "@/lib/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function AdminPage() {
  await requireAdminUserId()

  const exams = await prisma.exam.findMany({
    orderBy: [{ stage: "asc" }, { subject: "asc" }],
    include: { questions: { orderBy: { createdAt: "asc" } } },
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Portal</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Manage exam stages and questions</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-slate-700 hover:underline dark:text-slate-200">Back to dashboard</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Create Exam</CardTitle>
              <CardDescription>Create one exam per subject (per stage).</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createExam} className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="stage" className="text-sm text-foreground">Stage</label>
                  <Input id="stage" name="stage" type="number" min={1} placeholder="1" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm text-foreground">Subject</label>
                  <Input id="subject" name="subject" type="text" placeholder="Mathematics" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="duration" className="text-sm text-foreground">Duration (seconds)</label>
                  <Input id="duration" name="duration" type="number" min={60} placeholder="1800" required />
                </div>
                <Button>Create Exam</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create Question</CardTitle>
              <CardDescription>Options are entered one per line.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={createQuestion} className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="examId" className="text-sm text-foreground">Exam</label>
                  <select
                    id="examId"
                    name="examId"
                    required
                    className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue={exams[0]?.id || ""}
                  >
                    {exams.length === 0 ? (
                      <option value="" disabled>No exams yet</option>
                    ) : (
                      exams.map((exam) => (
                        <option key={exam.id} value={exam.id}>
                          Stage {exam.stage} - {exam.subject} ({Math.floor(exam.duration / 60)} min)
                        </option>
                      ))
                    )}
                  </select>
                </div>

                <div className="grid gap-2">
                  <label htmlFor="text" className="text-sm text-foreground">Question Text</label>
                  <textarea
                    id="text"
                    name="text"
                    required
                    rows={3}
                    className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Enter the question here"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="options" className="text-sm text-foreground">Options (one per line)</label>
                  <textarea
                    id="options"
                    name="options"
                    required
                    rows={4}
                    className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Option A\nOption B\nOption C\nOption D"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="correctOption" className="text-sm text-foreground">Correct Option Index (0-based)</label>
                  <Input id="correctOption" name="correctOption" type="number" min={0} placeholder="0" required />
                </div>

                <Button disabled={exams.length === 0}>
                  Create Question
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Current Configuration</CardTitle>
              <CardDescription>Review existing exams and questions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {exams.length === 0 ? (
                <div className="rounded-md border border-border bg-muted p-4 text-sm text-slate-700 dark:text-slate-300">
                  No exams configured yet.
                </div>
              ) : (
                exams.map((exam) => (
                  <div key={exam.id} className="space-y-3">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-sm font-semibold">Stage {exam.stage} - {exam.subject}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-300">Duration: {exam.duration}s</div>
                    </div>

                    {exam.questions.length === 0 ? (
                      <div className="rounded-md border border-border bg-muted p-4 text-sm text-slate-700 dark:text-slate-300">
                        No questions yet.
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Question</TableHead>
                            <TableHead>Correct</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {exam.questions.map((q, idx) => (
                            <TableRow key={q.id}>
                              <TableCell>{idx + 1}</TableCell>
                              <TableCell>{q.text}</TableCell>
                              <TableCell>{q.correctOption}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
