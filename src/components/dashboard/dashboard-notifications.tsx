"use client"

import { useEffect, useMemo, useState } from "react"
import { Bell } from "lucide-react"

type NotificationItem = {
  id: string
  title: string
  timeLabel: string
  createdAtIso: string
  variant: "highlight" | "normal"
}

const LAST_SEEN_KEY = "irev.notifications.lastSeenIso"

export default function DashboardNotifications({
  items,
}: {
  items: NotificationItem[]
}) {
  const [open, setOpen] = useState(false)
  const [lastSeenIso, setLastSeenIso] = useState<string | null>(null)

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(LAST_SEEN_KEY)
      setLastSeenIso(v)
    } catch {
      setLastSeenIso(null)
    }
  }, [])

  const unreadCount = useMemo(() => {
    const lastSeen = lastSeenIso ? new Date(lastSeenIso).getTime() : 0
    return items.filter((n) => new Date(n.createdAtIso).getTime() > lastSeen).length
  }, [items, lastSeenIso])

  const toggle = () => {
    setOpen((v) => {
      const next = !v
      if (next) {
        const nowIso = new Date().toISOString()
        try {
          window.localStorage.setItem(LAST_SEEN_KEY, nowIso)
        } catch {
          // ignore
        }
        setLastSeenIso(nowIso)
      }
      return next
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="relative pt-1 cursor-pointer"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Bell className="h-6 w-6 text-white" />
        {unreadCount > 0 ? (
          <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-[#0A192F]">
            {Math.min(unreadCount, 9)}
          </div>
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          className="absolute right-0 mt-3 w-[320px] rounded-2xl bg-white border border-[#E2E8F0] shadow-xl overflow-hidden z-50"
        >
          <div className="px-5 py-4 border-b border-[#E2E8F0]">
            <p className="font-bold text-[#0A192F] text-sm">Notifications</p>
            <p className="text-xs text-[#64748B] mt-1">Latest updates from your exams and results.</p>
          </div>

          <div className="max-h-[340px] overflow-auto">
            {items.length === 0 ? (
              <div className="p-6 text-sm text-[#64748B]">No notifications yet.</div>
            ) : (
              <div className="divide-y divide-[#E2E8F0]">
                {items.map((n) => (
                  <div
                    key={n.id}
                    className={
                      n.variant === "highlight"
                        ? "px-5 py-4 bg-[#FEF3C7]/35"
                        : "px-5 py-4 bg-white"
                    }
                  >
                    <p className="text-sm font-semibold text-[#0A192F]">{n.title}</p>
                    <p className="text-xs text-[#64748B] mt-1">{n.timeLabel}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-5 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC]">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-bold text-[#0A192F] hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
