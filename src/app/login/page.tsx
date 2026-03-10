import { login } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/ui/submit-button"
import Link from "next/link"
import Image from "next/image"
import { Trophy } from "lucide-react" // Placeholder for iRev logo
import { PasswordInput } from "@/components/ui/password-input"

function getErrorMessage(error?: string) {
    if (!error) return null
    if (error === 'missing') return 'Please enter your email and password.'
    if (error === 'invalid') return 'Invalid email or password.'
    return 'Unable to login. Please try again.'
}

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams
    const errorParam = typeof resolvedSearchParams.error === 'string' ? resolvedSearchParams.error : undefined
    const errorMessage = getErrorMessage(errorParam)

    return (
        <div className="flex min-h-screen bg-[#F5F7FA] font-sans">
            {/* Left Form Section */}
            <div className="flex-1 flex flex-col justify-center items-center py-12 px-4 sm:px-8 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-md rounded-[24px] bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    {/* Logo Area */}
                    <div className="flex justify-center mb-8">
                        <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                            <Image
                                src="/irev-logo.jpg"
                                alt="iRev Logo"
                                width={120}
                                height={48}
                                className="object-contain h-12 w-auto"
                                priority
                            />
                        </Link>
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-bold tracking-tight text-[#1A233A] mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-base text-[#4A5568]">
                            Log in to your iRev account
                        </p>
                    </div>

                    {errorMessage && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            {errorMessage}
                        </div>
                    )}

                    <form action={login} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-[#1A233A] mb-2">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="h-12 rounded-lg border-[#E2E8F0] focus:border-accent focus-visible:ring-accent bg-transparent placeholder:text-[#A0AEC0] shadow-sm text-base text-[#1A233A]"
                                placeholder="you@gmail.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold text-[#1A233A] mb-2">
                                Password
                            </label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                required
                                className="h-12 rounded-lg border-[#E2E8F0] focus:border-accent focus-visible:ring-accent bg-transparent placeholder:text-[#A0AEC0] shadow-sm text-base text-[#1A233A]"
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="pt-2">
                            <SubmitButton className="w-full h-12 bg-accent hover:bg-accent/90 text-primary font-bold text-[15px] rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                                Login
                            </SubmitButton>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <p className="text-[#4A5568] font-medium">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-accent hover:underline font-bold">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="hidden lg:block relative w-0 flex-1 bg-primary">
                <Image
                    className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-overlay"
                    src="/desktop-6.jpg"
                    alt="Students smiling and looking forward"
                    fill
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <h3 className="font-serif text-4xl font-bold mb-4">Empowering Brilliance.</h3>
                    <p className="text-lg text-primary-foreground/80 max-w-lg leading-relaxed">
                        Join the intellectual revolution. Access fully-funded scholarships and transform your academic journey today.
                    </p>
                </div>
            </div>
        </div>
    )
}
