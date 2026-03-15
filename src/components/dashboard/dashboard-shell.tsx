"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import DashboardTabs from "@/components/dashboard/dashboard-tabs"

type DashboardShellProps = {
  children: React.ReactNode
  normalHeader: React.ReactNode
  normalHero: React.ReactNode
}

export default function DashboardShell({ children, normalHeader, normalHero }: DashboardShellProps) {
  const pathname = usePathname()

  const isSidebarPage =
    pathname === "/dashboard/profile" ||
    pathname === "/dashboard/settings" ||
    pathname === "/dashboard/results" ||
    pathname?.startsWith("/dashboard/profile/") ||
    pathname?.startsWith("/dashboard/settings/") ||
    pathname?.startsWith("/dashboard/results/")

  if (!isSidebarPage) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
        {normalHeader}
        {normalHero}
        <main className="flex-1 w-full flex flex-col pb-12">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-10 xl:px-0 mt-8 mb-6">
            <DashboardTabs />
          </div>
          <div className="flex-1 w-full relative z-10 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-sans">
      <div className="flex min-h-screen">
        <aside className="w-[260px] bg-[#0A192F] text-white hidden md:flex flex-col pt-10 pb-8 relative">
          <div className="px-8">
            <div className="w-14 h-14 rounded-full bg-white/15" />
          </div>

          <nav className="mt-12 flex flex-col gap-6 px-8 text-[15px] font-medium">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 transition-colors ${pathname === "/dashboard" ? "text-[#F59E0B] font-bold" : "text-white/90 hover:text-white"}`}
            >
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-3 transition-colors ${pathname.startsWith("/dashboard/settings") ? "text-[#F59E0B] font-bold" : "text-white/90 hover:text-white"}`}
            >
              <span>Settings</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 transition-colors ${pathname.startsWith("/dashboard/profile") ? "text-[#F59E0B] font-bold" : "text-white/90 hover:text-white"}`}
            >
              <span>Profile</span>
            </Link>
            <Link
              href="/dashboard/results"
              className={`flex items-center gap-3 transition-colors ${pathname.startsWith("/dashboard/results") ? "text-[#F59E0B] font-bold" : "text-white/90 hover:text-white"}`}
            >
              <span>Result</span>
            </Link>
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="bg-white border-b border-[#E2E8F0] h-[72px] flex items-center px-4 sm:px-10">
            <div className="md:hidden">
              <Link href="/dashboard" className="text-[#0A192F] font-semibold">
                Dashboard
              </Link>
            </div>
          </div>

          <main className="px-4 sm:px-10 py-10">
            <div className="max-w-4xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
