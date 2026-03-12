"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/history", label: "Performance" },
  { href: "/dashboard/breakdown", label: "Score Breakdown" },
]

export default function DashboardTabs() {
  const pathname = usePathname()

  const activeHref =
    pathname === "/dashboard" || pathname === "/dashboard/"
      ? "/dashboard"
      : pathname.startsWith("/dashboard/history")
        ? "/dashboard/history"
        : pathname.startsWith("/dashboard/breakdown")
          ? "/dashboard/breakdown"
          : "/dashboard"

  return (
    <div className="inline-flex rounded-full border border-[#F59E0B] p-1 bg-white mb-4 sm:mb-8 overflow-x-auto max-w-full shadow-sm">
      {tabs.map((t) => {
        const isActive = activeHref === t.href
        return (
          <Link
            key={t.href}
            href={t.href}
            className={
              isActive
                ? "px-6 py-2 rounded-full text-sm font-medium transition-colors bg-[#64748B] text-white"
                : "px-6 py-2 rounded-full text-sm font-medium transition-colors text-[#64748B] hover:bg-slate-100 whitespace-nowrap"
            }
          >
            {t.label}
          </Link>
        )
      })}
    </div>
  )
}
