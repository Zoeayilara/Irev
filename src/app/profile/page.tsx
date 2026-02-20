import Link from "next/link"
import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import AvatarUploader from "@/components/profile/avatar-uploader"
import { updateProfile } from "@/lib/profile-actions"
import SubmitButton from "@/components/ui/submit-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
    const userId = await requireUserId()

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, fullName: true, avatarUrl: true, role: true, currentStage: true, createdAt: true },
    })

    if (user?.currentStage === 0) {
        await prisma.user.update({ where: { id: userId }, data: { currentStage: 1 } })
        redirect('/profile')
    }

    const results = await prisma.attempt.findMany({
        where: {
            userId,
            status: "COMPLETED",
            isProcessed: true,
        },
        orderBy: { submitTime: "desc" },
        include: { exam: true },
    })

    if (!user) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Profile</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">User not found.</p>
                    <Link href="/dashboard" className="mt-6 inline-block text-primary hover:underline">Back to dashboard</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-border bg-card px-6 py-4">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div>
                        <h1 className="text-xl font-bold">My Profile</h1>
                        <div className="text-sm text-slate-600 dark:text-slate-300">Manage your candidate details and view results</div>
                    </div>
                    <Link href="/dashboard" className="text-sm text-slate-700 hover:underline dark:text-slate-200">Back to dashboard</Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Candidate</CardTitle>
                            <CardDescription>Your profile and stage</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <AvatarUploader email={user.email} avatarUrl={user.avatarUrl || null} />

                            <div className="grid gap-2">
                                <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Email</div>
                                <div className="text-sm font-medium">{user.email}</div>
                            </div>

                            <div className="grid gap-2">
                                <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Current Stage</div>
                                <div>
                                    <Badge variant="outline">Stage {user.currentStage}</Badge>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-300">Member Since</div>
                                <div className="text-sm">{new Date(user.createdAt).toLocaleString()}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Edit Profile</CardTitle>
                            <CardDescription>Update your details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <form action={updateProfile} className="grid gap-4 max-w-lg">
                                <div className="grid gap-2">
                                    <label htmlFor="fullName" className="text-sm font-medium">Full name</label>
                                    <Input id="fullName" name="fullName" type="text" defaultValue={user.fullName || ""} placeholder="Your full name" />
                                </div>

                                <div className="flex items-center gap-3">
                                    <SubmitButton pendingText="Saving...">Save changes</SubmitButton>
                                    <div className="text-xs text-slate-600 dark:text-slate-300">Your email cannot be changed.</div>
                                </div>
                            </form>

                            <div className="border-t border-border pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-lg font-bold">Results</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-300">Released results appear here</div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    {results.length === 0 ? (
                                        <div className="rounded-md border border-border bg-muted p-4 text-sm text-slate-700 dark:text-slate-300">
                                            No released results yet.
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
                                                {results.map((attempt) => {
                                                    const score = typeof attempt.score === 'number' ? attempt.score : null
                                                    const passed = score !== null && score >= 70
                                                    return (
                                                        <TableRow key={attempt.id}>
                                                            <TableCell>Stage {attempt.exam.stage}</TableCell>
                                                            <TableCell>{attempt.exam.subject}</TableCell>
                                                            <TableCell>{attempt.submitTime ? new Date(attempt.submitTime).toLocaleString() : "-"}</TableCell>
                                                            <TableCell>{score === null ? "-" : `${score.toFixed(1)}%`}</TableCell>
                                                            <TableCell>
                                                                {score === null ? (
                                                                    <Badge variant="outline">Released</Badge>
                                                                ) : passed ? (
                                                                    <Badge variant="success">Passed</Badge>
                                                                ) : (
                                                                    <Badge variant="danger">Not Passed</Badge>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
