import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Calendar, School } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    const userId = await requireUserId()
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return null

    return (
        <div className="w-full bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-[#E2E8F0] animate-in fade-in duration-500">
            <header className="mb-8 border-b border-[#E2E8F0] pb-6">
                <h2 className="text-2xl font-serif font-bold text-[#0A192F] mb-1">My Profile</h2>
                <p className="text-[#64748B]">View and manage your registration details.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
