import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const dynamic = "force-dynamic"

export default async function DashboardResultsPage() {
  const userId = await requireUserId()

  const attempts = await prisma.attempt.findMany({
    where: {
      userId,
      status: "COMPLETED",
    },
    include: { exam: true },
    orderBy: { submitTime: "desc" },
  })

  const stageRows = (() => {
    const bestByStage = new Map<number, (typeof attempts)[number]>()
    for (const a of attempts) {
      const stage = a.exam.stage
      const existing = bestByStage.get(stage)

      const aScore = typeof a.score === "number" ? a.score : null
      const eScore = existing && typeof existing.score === "number" ? existing.score : null

      if (!existing) {
        bestByStage.set(stage, a)
        continue
      }

      if (a.isProcessed && !existing.isProcessed) {
        bestByStage.set(stage, a)
        continue
      }
      if (a.isProcessed === existing.isProcessed) {
        if (aScore !== null && (eScore === null || aScore > eScore)) {
          bestByStage.set(stage, a)
          continue
        }
        if (a.submitTime && existing.submitTime && a.submitTime > existing.submitTime) {
          bestByStage.set(stage, a)
          continue
        }
      }
    }

    return Array.from(bestByStage.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([, a]) => {
        const score = typeof a.score === "number" ? a.score : null
        const passed = score !== null && score >= 70
        return {
          id: a.id,
          stage: a.exam.stage,
          subject: a.exam.subject,
          submitTime: a.submitTime,
          isProcessed: a.isProcessed,
          resultReleaseAt: a.resultReleaseAt,
          score,
          passed,
        }
      })
  })()

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10">
      <div className="text-center">
        <h1 className="font-serif text-2xl font-bold text-[#0A192F]">Result</h1>
        <p className="mt-2 text-sm text-slate-600">Scores show only when results are released.</p>
      </div>

      <div className="mt-10">
        {stageRows.length === 0 ? (
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 text-sm text-[#64748B]">No completed exams yet.</div>
        ) : (
          <div className="rounded-xl border border-[#E2E8F0] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stage</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stageRows.map((r) => {
                  const released = r.isProcessed
                  const dateText = r.submitTime ? new Date(r.submitTime).toLocaleString() : "-"

                  const statusBadge = released
                    ? r.score === null
                      ? <Badge variant="outline">Released</Badge>
                      : r.passed
                        ? <Badge variant="success">Passed</Badge>
                        : <Badge variant="danger">Not Passed</Badge>
                    : <Badge variant="warning">Pending</Badge>

                  const scoreText = released
                    ? r.score === null
                      ? "-"
                      : `${r.score.toFixed(1)}%`
                    : r.resultReleaseAt
                      ? `Releases ${new Date(r.resultReleaseAt).toLocaleString()}`
                      : "Processing"

                  return (
                    <TableRow key={r.id}>
                      <TableCell className="font-semibold">Stage {r.stage}</TableCell>
                      <TableCell>{r.subject}</TableCell>
                      <TableCell>{dateText}</TableCell>
                      <TableCell>{scoreText}</TableCell>
                      <TableCell>{statusBadge}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
