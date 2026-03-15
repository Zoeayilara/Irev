import prisma from "@/lib/prisma"
import { requireUserId } from "@/lib/auth"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/ui/submit-button"
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
            phoneNumber: true,
            academicLevel: true,
            schoolName: true,
        },
    })

    if (!user) return null

    return (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10">
            <div className="text-center">
                <h1 className="font-serif text-2xl font-bold text-[#0A192F]">Profile</h1>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-[#F6F4FA] p-6 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white" />
                <div>
                    <div className="font-serif font-bold text-[#0A192F]">{user.fullName || "-"}</div>
                    <button type="button" className="mt-1 text-xs font-semibold text-slate-500">
                        Upload new Photo
                    </button>
                </div>
            </div>

            <form action={updateDashboardProfile} className="mt-10">
                <div>
                    <h2 className="font-serif font-bold text-base text-[#0A192F]">Personal Information</h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label className="text-sm font-semibold text-[#0A192F]">Full Name</label>
                            <Input name="fullName" defaultValue={user.fullName || ""} placeholder="Your name" className="mt-2 h-12 border-[#F59E0B]/40 focus-visible:ring-[#F59E0B]/30" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#0A192F]">Email Address</label>
                            <Input value={user.email} disabled className="mt-2 h-12" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#0A192F]">Phone Number</label>
                            <Input name="phoneNumber" defaultValue={user.phoneNumber || ""} placeholder="Your number" className="mt-2 h-12 border-[#F59E0B]/40 focus-visible:ring-[#F59E0B]/30" />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="font-serif font-bold text-base text-[#0A192F]">Academic Information</h2>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-semibold text-[#0A192F]">Current Category</label>
                            <select
                                name="academicLevel"
                                defaultValue={user.academicLevel || ""}
                                className="mt-2 h-12 w-full rounded-lg border border-[#F59E0B]/40 bg-white px-3 text-sm outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                            >
                                <option value="">Select category</option>
                                <option value="pry5">Primary 5</option>
                                <option value="pry6">Primary 6</option>
                                <option value="jss1">JSS1</option>
                                <option value="jss2">JSS2</option>
                                <option value="jss3">JSS3</option>
                                <option value="ss1">SS1</option>
                                <option value="ss2">SS2</option>
                                <option value="ss3">SS3</option>
                                <option value="nd1">ND 1</option>
                                <option value="nd2">ND 2</option>
                                <option value="hnd1">HND 1</option>
                                <option value="hnd2">HND 2</option>
                                <option value="100">100 Level</option>
                                <option value="200">200 Level</option>
                                <option value="300">300 Level</option>
                                <option value="400">400 Level</option>
                                <option value="500">500 Level</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-[#0A192F]">School Name</label>
                            <Input name="schoolName" defaultValue={user.schoolName || ""} placeholder="Your name" className="mt-2 h-12 border-[#F59E0B]/40 focus-visible:ring-[#F59E0B]/30" />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <SubmitButton pendingText="Saving..." className="w-full sm:w-[360px] mx-auto block bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-semibold h-12 rounded-md">
                        Save Change
                    </SubmitButton>
                </div>
            </form>
        </div>
    )
}
