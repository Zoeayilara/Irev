import Link from "next/link"
import prisma from "@/lib/prisma"
import { requireAdminUserId } from "@/lib/auth"
import { createExam, createQuestion } from "@/lib/admin-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SubmitButton from "@/components/ui/submit-button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, CheckCircle2, Activity } from "lucide-react"

export default async function AdminPage() {
  await requireAdminUserId()

  const exams = await prisma.exam.findMany({
    orderBy: [{ stage: "asc" }, { subject: "asc" }],
    include: { questions: { orderBy: { createdAt: "asc" } } },
  })

  // Analytics queries
  const totalApplicants = await prisma.user.count({ where: { role: "CANDIDATE" } })
  const examsTaken = await prisma.attempt.count({ where: { status: "COMPLETED" } })
  const resultsPublished = await prisma.attempt.count({ where: { isProcessed: true } })
  const activeSessions = await prisma.attempt.count({ where: { status: "ONGOING" } })

  return (
    <div className="min-h-screen bg-slate-50 text-foreground font-sans">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-accent text-accent-foreground font-serif font-bold text-lg px-2 py-0.5 rounded shadow-sm">
              iRev Admin
            </div>
            <div className="hidden sm:block border-l border-primary-foreground/20 h-8 pl-4">
              <h1 className="text-base font-bold">Control Portal</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-primary-foreground/80 hover:text-white transition-colors bg-primary-foreground/10 px-4 py-2 rounded-lg border border-primary-foreground/20">
              Return to User Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Examination Management</h2>
          <p className="text-slate-600">Configure exam stages, subjects, and maintain the secure question bank.</p>
        </div>

        {/* Global Overview Analytics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-6xl mx-auto">
          <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden relative group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users size={24} />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Applicants</p>
              <h3 className="text-3xl font-bold text-slate-900">{totalApplicants.toLocaleString()}</h3>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden relative group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FileText size={24} />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Exams Taken</p>
              <h3 className="text-3xl font-bold text-slate-900">{examsTaken.toLocaleString()}</h3>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden relative group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Results Published</p>
              <h3 className="text-3xl font-bold text-slate-900">{resultsPublished.toLocaleString()}</h3>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden relative group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Activity size={24} />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Sessions</p>
              <h3 className="text-3xl font-bold text-slate-900">{activeSessions.toLocaleString()}</h3>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden self-start">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-xl font-serif text-slate-900">Create Exam Module</CardTitle>
              <CardDescription>Establish a new subject paper for a specific stage.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form action={createExam} className="grid gap-5">
                <div className="grid gap-2">
                  <label htmlFor="stage" className="text-sm font-semibold text-slate-700">Stage Level</label>
                  <Input id="stage" name="stage" type="number" min={1} placeholder="1" required className="h-11 border-slate-300 focus-visible:ring-primary shadow-sm" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700">Subject Name</label>
                  <Input id="subject" name="subject" type="text" placeholder="e.g. Mathematics" required className="h-11 border-slate-300 focus-visible:ring-primary shadow-sm" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="duration" className="text-sm font-semibold text-slate-700">Duration (seconds)</label>
                  <Input id="duration" name="duration" type="number" min={60} placeholder="1800" required className="h-11 border-slate-300 focus-visible:ring-primary shadow-sm" />
                </div>
                <SubmitButton className="w-full h-11 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg shadow-sm transition-all" pendingText="Creating...">
                  Create Exam
                </SubmitButton>
              </form>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-xl font-serif text-slate-900">Create Question</CardTitle>
              <CardDescription>Options are entered one per line.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form action={createQuestion} className="grid gap-5">
                <div className="grid gap-2">
                  <label htmlFor="examId" className="text-sm font-semibold text-slate-700">Select Exam Module</label>
                  <select
                    id="examId"
                    name="examId"
                    required
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
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
                  <label htmlFor="text" className="text-sm font-semibold text-slate-700">Question Text</label>
                  <textarea
                    id="text"
                    name="text"
                    required
                    rows={3}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                    placeholder="Enter the question here"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="options" className="text-sm font-semibold text-slate-700">Options (one per line)</label>
                  <textarea
                    id="options"
                    name="options"
                    required
                    rows={4}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                    placeholder="Option A&#10;Option B&#10;Option C&#10;Option D"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="correctOption" className="text-sm font-semibold text-slate-700">Correct Option Index (0-based)</label>
                  <Input id="correctOption" name="correctOption" type="number" min={0} placeholder="0" required className="h-11 border-slate-300 focus-visible:ring-primary shadow-sm" />
                </div>

                <SubmitButton
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg shadow-sm transition-all"
                  pendingText="Creating..."
                  disabled={exams.length === 0}
                >
                  Add Question to Bank
                </SubmitButton>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-slate-200 shadow-sm rounded-2xl overflow-hidden mb-10">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-xl font-serif text-slate-900">Current Configuration</CardTitle>
              <CardDescription>Review existing exams and active question banks.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {exams.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No exams configured yet.
                </div>
              ) : (
                exams.map((exam) => (
                  <div key={exam.id} className="space-y-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3">
                      <div className="text-lg font-bold text-slate-800">
                        <span className="text-primary mr-2">Stage {exam.stage}</span>
                        {exam.subject}
                      </div>
                      <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">Duration: {exam.duration}s</div>
                    </div>

                    {exam.questions.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-500">
                        No questions yet in this bank.
                      </div>
                    ) : (
                      <div className="overflow-hidden border border-slate-200 rounded-lg">
                        <Table>
                          <TableHeader className="bg-slate-50">
                            <TableRow>
                              <TableHead className="w-12 font-bold text-slate-700">#</TableHead>
                              <TableHead className="font-bold text-slate-700">Question Item</TableHead>
                              <TableHead className="w-24 font-bold text-slate-700 text-center">Correct</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {exam.questions.map((q, idx) => (
                              <TableRow key={q.id}>
                                <TableCell className="text-slate-500 font-medium">{idx + 1}</TableCell>
                                <TableCell className="text-slate-800">{q.text}</TableCell>
                                <TableCell className="text-center">
                                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-md border border-emerald-200">
                                    Idx: {q.correctOption}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
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
