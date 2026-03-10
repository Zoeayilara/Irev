import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { logout } from "@/lib/actions"
import { requireUserId } from "@/lib/auth"
import { Trophy, ChevronDown, Bell, LogOut, User as UserIcon, Settings, HelpCircle, GraduationCap } from "lucide-react"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userId = await requireUserId()

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
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full font-medium text-sm flex items-center shadow-sm">
                            Science
                        </div>

                        <div className="relative pt-1 cursor-pointer">
                            <Bell className="h-6 w-6 text-white" />
                            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#0A192F]">
                                2
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full flex flex-col pb-12">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-10 xl:px-0 mt-8 mb-6">
                    {/* Figma accurate Tabs Navigation */}
                    <div className="inline-flex rounded-full border border-[#F59E0B] p-1 bg-white mb-4 sm:mb-8 overflow-x-auto max-w-full shadow-sm">
                        <Link href="/dashboard" className="px-6 py-2 rounded-full text-sm font-medium transition-colors bg-[#64748B] text-white">
                            Overview
                        </Link>
                        <Link href="/dashboard/history" className="px-6 py-2 rounded-full text-sm font-medium transition-colors text-[#64748B] hover:bg-slate-100 whitespace-nowrap">
                            Performance
                        </Link>
                        <Link href="/dashboard/breakdown" className="px-6 py-2 rounded-full text-sm font-medium transition-colors text-[#64748B] hover:bg-slate-100 whitespace-nowrap">
                            Score Breakdown
                        </Link>
                    </div>
                </div>

                {/* Dynamic Page Content */}
                <div className="flex-1 w-full relative z-10 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
