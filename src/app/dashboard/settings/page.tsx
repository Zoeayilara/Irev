import { requireUserId } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function DashboardSettingsPage() {
  await requireUserId()

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10">
      <h1 className="font-serif text-2xl font-bold text-[#0A192F]">Settings</h1>
      <p className="mt-2 text-sm text-slate-600">Manage your preferences and account settings.</p>

      <div className="mt-10 grid grid-cols-1 gap-6">
        <div className="rounded-xl border border-slate-200 p-5">
          <div className="text-sm font-semibold text-[#0A192F]">Notifications</div>
          <p className="mt-2 text-sm text-slate-600">Notifications are shown in your dashboard bell icon.</p>
        </div>

        <div className="rounded-xl border border-slate-200 p-5">
          <div className="text-sm font-semibold text-[#0A192F]">Privacy</div>
          <p className="mt-2 text-sm text-slate-600">Your email is not editable.</p>
        </div>
      </div>
    </div>
  )
}
