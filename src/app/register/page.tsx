import { register } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import SubmitButton from "@/components/ui/submit-button"
import Link from "next/link"

function getErrorMessage(error?: string) {
    if (!error) return null
    if (error === 'missing') return 'Please fill in the required fields.'
    if (error === 'exists') return 'An account with this email already exists. Please login.'
    if (error === 'reset') return 'This email already exists. Please create a password to continue.'
    if (error === 'nomatch') return 'Passwords do not match.'
    return 'Unable to register. Please try again.'
}

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams
    const errorParam = typeof resolvedSearchParams.error === 'string' ? resolvedSearchParams.error : undefined
    const errorMessage = getErrorMessage(errorParam)

    return (
        <div className="min-h-screen bg-[#F5F7FA] font-sans pb-20">
            {/* Top Navy Banner */}
            <div className="bg-primary text-white pt-16 pb-32 px-4 text-center">
                <div className="flex justify-center items-center gap-2 mb-2">
                    <h1 className="text-4xl md:text-[50px] font-serif font-bold text-white tracking-tight">
                        Register For
                    </h1>
                    <span className="bg-accent text-[#1A233A] text-4xl md:text-[50px] font-serif font-bold px-4 py-1 rounded-[12px] inline-block">
                        iRev
                    </span>
                </div>
                <p className="text-lg md:text-xl text-primary-foreground/90 mt-4 max-w-2xl mx-auto">
                    Join the Intellectual Revolution today.
                </p>
            </div>

            {/* Main Form Container */}
            <div className="max-w-[800px] mx-auto -mt-20 px-4">
                <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 py-10 sm:px-12 sm:py-12 border border-[#E2E8F0]">
                    {errorMessage && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-8 flex items-start flex-col">
                            <span className="font-semibold mb-1">Registration Error</span>
                            {errorMessage}
                        </div>
                    )}

                    <form action={register} className="space-y-12">

                        {/* Section 1: Registration Information */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-[#1A233A]">Registration Information</h3>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="fullName" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                        Full Name<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                        placeholder="As it appears on your birth certificate"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="dob" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                            Date of Birth
                                        </label>
                                        <Input
                                            id="dob"
                                            name="dob"
                                            type="date"
                                            required
                                            className="h-[52px] w-full rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            defaultValue=""
                                            className="flex h-[52px] w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-base text-[#1A233A] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A0AEC0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%23A0AEC0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat shadow-sm"
                                        >
                                            <option value="" disabled className="text-[#A0AEC0]">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Academic Information */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-[#1A233A]">Academic Information</h3>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="academicLevel" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                        Class<span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="academicLevel"
                                        name="academicLevel"
                                        required
                                        defaultValue=""
                                        className="flex h-[52px] w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-base text-[#1A233A] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#A0AEC0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:bg-white disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%23A0AEC0%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat shadow-sm"
                                    >
                                        <option value="" disabled className="text-[#A0AEC0]">Select level</option>
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
                                    <label htmlFor="schoolName" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                        School Name<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="schoolName"
                                        name="schoolName"
                                        type="text"
                                        required
                                        className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                        placeholder="Enter school name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Guardian Information */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-[#1A233A]">Guardian Information</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="guardianName" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                        Parent/Guardian Name<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="guardianName"
                                        name="guardianName"
                                        type="text"
                                        required
                                        className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                        placeholder="Full name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="guardianPhone" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                        Parent Phone Number<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="guardianPhone"
                                        name="guardianPhone"
                                        type="tel"
                                        required
                                        className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                        placeholder="e.g +234 800..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: Login Details */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-[#1A233A]">Login Details</h3>

                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                        Email<span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="password" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                            Password<span className="text-red-500">*</span>
                                        </label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                            placeholder="********"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-[15px] font-medium text-[#4A5568] mb-2">
                                            Confirm Password<span className="text-red-500">*</span>
                                        </label>
                                        <PasswordInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            className="h-[52px] rounded-lg border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:border-accent focus-visible:ring-accent shadow-sm text-base text-[#1A233A] placeholder:text-[#A0AEC0]"
                                            placeholder="********"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms & Submit */}
                        <div className="pt-6">
                            <div className="flex items-start mb-8">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-5 w-5 rounded border-[#E2E8F0] text-accent focus:ring-accent accent-accent transition-colors"
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-medium text-[#4A5568] cursor-pointer">
                                        I agree to the <span className="text-primary hover:underline">Term & conditions of iRev*</span>
                                    </label>
                                </div>
                            </div>

                            <SubmitButton className="w-full h-14 bg-accent hover:bg-accent/90 text-[#1A233A] font-bold text-[16px] rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                                <span className="w-full h-full flex items-center justify-center rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#0A1930] text-white">
                                    Create Account
                                </span>
                            </SubmitButton>

                            <div className="mt-8 text-center">
                                <p className="text-[15px] text-[#4A5568]">
                                    Already have an account?{" "}
                                    <Link href="/login" className="font-bold text-accent hover:underline">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
