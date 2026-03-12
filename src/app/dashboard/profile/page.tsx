import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/ui/submit-button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Mail, Calendar, School } from "lucide-react"
import { updateDashboardProfile } from "@/lib/profile-actions"

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    const userId = await requireUserId()
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            fullName: true,
            currentStage: true,
            createdAt: true,
        },
    })

    if (!user) return null

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
        <div className="w-full bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E2E8F0] animate-in fade-in duration-500">
            <header className="mb-8 border-b border-[#E2E8F0] pb-6">
                <h2 className="text-2xl font-serif font-bold text-[#0A192F] mb-1">My Profile</h2>
                <p className="text-[#64748B]">View and manage your registration details.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="shadow-none border-none bg-[#F8FAFC] rounded-xl overflow-hidden">
                    <CardHeader className="bg-[#F1F5F9] border-b border-[#E2E8F0] px-6 py-4">
                        <CardTitle className="text-base font-bold text-[#0A192F] flex items-center gap-2">
                            <User className="h-5 w-5 text-[#F59E0B]" /> Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#64748B] font-bold mb-1">Full Name</p>
                            <p className="text-lg font-semibold text-[#1A233A]">{user.fullName || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#64748B] font-bold mb-1">Email Address</p>
                            <p className="text-base text-[#1A233A] flex items-center gap-2">
                                <Mail className="h-4 w-4 text-slate-400" /> {user.email}
                            </p>
                        </div>

                        <div className="pt-2 border-t border-[#E2E8F0]">
                            <p className="text-xs uppercase tracking-wider text-[#64748B] font-bold mb-3">Edit name</p>
                            <form action={updateDashboardProfile} className="space-y-3">
                                <Input
                                    name="fullName"
                                    defaultValue={user.fullName || ""}
                                    placeholder="Enter your full name"
                                />
                                <div className="flex items-center gap-3">
                                    <SubmitButton pendingText="Saving..." className="bg-[#0A192F] hover:bg-[#112240]">
                                        Save
                                    </SubmitButton>
                                    <p className="text-xs text-[#64748B]">Email cannot be changed.</p>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-none bg-[#F8FAFC] rounded-xl overflow-hidden">
                    <CardHeader className="bg-[#F1F5F9] border-b border-[#E2E8F0] px-6 py-4">
                        <CardTitle className="text-base font-bold text-[#0A192F] flex items-center gap-2">
                            <School className="h-5 w-5 text-[#F59E0B]" /> Academic Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#64748B] font-bold mb-1">Current Stage</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0E7FF] text-[#4338CA] text-sm font-bold mt-1">
                                Stage {user.currentStage}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#64748B] font-bold mb-1">Registration Date</p>
                            <p className="text-base text-[#1A233A] flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-[#A0AEC0]" /> {user.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wider text-[#64748B] font-bold mb-1">Candidate ID</p>
                            <p className="text-base text-[#1A233A]">iRev-2025-{user.id.substring(user.id.length - 5).toUpperCase()}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-none bg-[#F8FAFC] rounded-xl overflow-hidden lg:col-span-3">
                    <CardHeader className="bg-[#F1F5F9] border-b border-[#E2E8F0] px-6 py-4">
                        <CardTitle className="text-base font-bold text-[#0A192F] flex items-center justify-between">
                            <span>Stage Results</span>
                            <span className="text-xs text-[#64748B] font-semibold">Scores show only when results are released</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {stageRows.length === 0 ? (
                            <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 text-sm text-[#64748B]">
                                No completed exams yet.
                            </div>
                        ) : (
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
