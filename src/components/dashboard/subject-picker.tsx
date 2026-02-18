'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type ExamOption = {
  id: string
  subject: string
  duration: number
}

export default function SubjectPicker({
  exams,
  ongoingExamId,
}: {
  exams: ExamOption[]
  ongoingExamId: string | null
}) {
  const router = useRouter()

  const defaultExamId = useMemo(() => exams[0]?.id ?? '', [exams])
  const [selectedExamId, setSelectedExamId] = useState(() => defaultExamId)

  const normalizedSelectedExamId = useMemo(() => {
    if (!selectedExamId) return defaultExamId
    const stillValid = exams.some((e) => e.id === selectedExamId)
    return stillValid ? selectedExamId : defaultExamId
  }, [defaultExamId, exams, selectedExamId])

  useEffect(() => {
    const maybeBootstrap = async () => {
      // If we only have one subject (usually legacy "General"), bootstrap Math/English.
      if (ongoingExamId) return
      if (exams.length !== 1) return

      if (exams[0]?.subject !== 'General') return

      try {
        const res = await fetch('/api/bootstrap-stage1-exams', { method: 'POST' })
        if (!res.ok) return
        router.refresh()
      } catch {
        // ignore
      }
    }

    void maybeBootstrap()
  }, [exams, ongoingExamId, router])

  const effectiveExamId = ongoingExamId || normalizedSelectedExamId

  return (
    <div className="space-y-3">
      {ongoingExamId ? (
        <div className="rounded-md border border-border bg-muted p-3 text-sm text-foreground/80">
          You have an ongoing attempt. Resume to continue.
        </div>
      ) : null}

      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground">Select Subject</label>
        <select
          disabled={!!ongoingExamId}
          value={effectiveExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
          className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
        >
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.subject} ({Math.floor(exam.duration / 60)} min)
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between gap-3">
        <Badge variant="outline">{exams.length} subjects available</Badge>
        <Button
          disabled={!effectiveExamId}
          onClick={() => router.push(`/exam?examId=${effectiveExamId}`)}
        >
          {ongoingExamId ? 'Resume Exam' : 'Start Exam'}
        </Button>
      </div>
    </div>
  )
}
