import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { logout } from "@/lib/actions"
import { requireUserId } from "@/lib/auth"
import { ChevronDown, User as UserIcon } from "lucide-react"
import DashboardTabs from "@/components/dashboard/dashboard-tabs"
import DashboardNotifications from "@/components/dashboard/dashboard-notifications"
import { releaseResultsForUser } from "@/lib/result-processing"

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userId = await requireUserId()

    await releaseResultsForUser(userId)

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            fullName: true,
            role: true,
            currentStage: true,
        }
    })

    if (!user) {
        redirect("/login")
    }

    // Fallback data if incomplete
    const initals = user.fullName
        ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'AT'
    const firstName = user.fullName ? user.fullName.split(' ')[0].toUpperCase() : 'CANDIDATE'
    const lastName = user.fullName && user.fullName.includes(' ') ? user.fullName.split(' ').slice(1).join(' ').toUpperCase() : ''
    const displayName = `${firstName} ${lastName}`.trim()
    const schoolDisplayText = `iRev Academy • Stage ${user.currentStage}`
    const userDisplayId = `ID: iRev-2025-${user.id.substring(user.id.length - 5).toUpperCase()}`

    const attempts = await prisma.attempt.findMany({
        where: {
            userId,
            OR: [{ status: "ONGOING" }, { status: "COMPLETED" }],
        },
        include: { exam: true },
        orderBy: [{ submitTime: "desc" }, { startTime: "desc" }],
        take: 10,
    })

    const subjectPillText = (() => {
        const ongoing = attempts.find(a => a.status === "ONGOING")
        if (ongoing) return ongoing.exam.subject
        const lastCompleted = attempts.find(a => a.status === "COMPLETED")
        if (lastCompleted) return lastCompleted.exam.subject
        return ""
    })()

    const now = new Date()
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

    const notificationItems = attempts
        .filter(a => a.status === "ONGOING" || (a.status === "COMPLETED" && a.submitTime))
        .slice(0, 5)
        .map(a => {
            if (a.status === "ONGOING") {
                return {
                    id: a.id,
                    title: `Ongoing exam: Stage ${a.exam.stage} (${a.exam.subject}).`,
                    timeLabel: formatRelativeTime(a.startTime),
                    createdAtIso: a.startTime.toISOString(),
                    variant: "highlight" as const,
                }
            }

            const submit = a.submitTime as Date
            if (a.isProcessed) {
                return {
                    id: a.id,
                    title: `Result released: Stage ${a.exam.stage} (${a.exam.subject}).`,
                    timeLabel: formatRelativeTime(submit),
                    createdAtIso: submit.toISOString(),
                    variant: "normal" as const,
                }
            }

            return {
                id: a.id,
                title: `Result processing: Stage ${a.exam.stage} (${a.exam.subject}).`,
                timeLabel: formatRelativeTime(submit),
                createdAtIso: submit.toISOString(),
                variant: "highlight" as const,
            }
        })

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
            {/* Top Navbar */}
            <header className="bg-white border-b border-[#E2E8F0] h-[72px] flex items-center justify-between px-6 sm:px-10 lg:px-20 z-30 relative">
                <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                    <Image
                        src="/irev-logo.jpg"
                        alt="iRev Logo"
                        width={120}
                        height={48}
                        className="object-contain h-10 w-auto"
                        priority
                    />
                </Link>
                <div className="flex items-center gap-6 font-medium text-[#1A233A]">
                    <Link href="/dashboard/profile" className="hidden md:flex items-center gap-2 hover:text-amber-500 transition-colors">
                        <UserIcon className="h-5 w-5" />
                        <span>Profile</span>
                    </Link>
                    <form action={logout}>
                        <button type="submit" className="bg-[#0A192F] hover:bg-[#112240] text-white px-6 py-2 rounded-md font-medium text-sm transition-colors hidden sm:block">
                            Log out
                        </button>
                    </form>
                </div>
            </header>

            {/* Navy Hero Banner Area */}
            <div className="bg-[#0A192F] px-6 sm:px-10 lg:px-20 py-12 relative">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-between">

                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8">
                        {/* Avatar Circle */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-[#0A192F]">
                            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#1A233A] tracking-wider">{initals}</span>
                        </div>

                        {/* User Info */}
                        <div className="text-center sm:text-left mt-4 sm:mt-0">
                            <div className="flex items-center justify-center sm:justify-start gap-3 group relative cursor-pointer">
                                <Link href="/dashboard/profile">
                                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F59E0B] uppercase tracking-wide hover:underline inline-flex items-center gap-2">
                                        {displayName}
                                    </h1>
                                </Link>
                                <div className="relative">
                                    <ChevronDown className="h-5 w-5 text-[#F59E0B] mt-1 hidden sm:block dropdown-trigger" />
                                </div>
                            </div>
                            <p className="text-white text-base sm:text-lg mt-2 opacity-90">{schoolDisplayText}</p>
                            <p className="text-white/60 text-sm mt-1">{userDisplayId}</p>
                        </div>
                    </div>

                    {/* Right side controls (Notifications & Stage Pill) */}
                    <div className="hidden sm:flex items-start gap-6 mt-4 sm:mt-0 relative">
                        {subjectPillText ? (
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-medium text-sm flex items-center shadow-sm">
                                {subjectPillText}
                            </div>
                        ) : null}

                        <DashboardNotifications items={notificationItems} />
                    </div>

                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col pb-12">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-10 xl:px-0 mt-8 mb-6">
                    {/* Figma accurate Tabs Navigation */}
                    <DashboardTabs />
                </div>

                {/* Dynamic Page Content */}
                <div className="flex-1 w-full relative z-10 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
