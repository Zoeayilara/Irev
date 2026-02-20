import { login } from "@/lib/actions"
import { Input } from "@/components/ui/input"
import SubmitButton from "@/components/ui/submit-button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function getErrorMessage(error?: string) {
    if (!error) return null
    if (error === 'missing') return 'Please enter your email and password.'
    if (error === 'invalid') return 'Invalid email or password.'
    return 'Unable to login. Please try again.'
}

export default function LoginPage({
    searchParams,
}: {
    searchParams?: { error?: string }
}) {
    const errorMessage = getErrorMessage(searchParams?.error)

    return (
        <div className="min-h-screen bg-background">
            <div className="min-h-screen grid lg:grid-cols-2">
                <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-slate-50 to-blue-50 border-r border-border">
                    <div className="space-y-2">
                        <div className="text-sm font-semibold text-slate-700">Scholarship Exam Portal</div>
                        <div className="text-4xl font-bold tracking-tight text-slate-900">Candidate Login</div>
                        <div className="text-slate-600 max-w-md">
                            Sign in to select your subject and begin your exam in a secure environment.
                        </div>
                    </div>
                    <div className="text-xs text-slate-500">© {new Date().getFullYear()} Scholarship Exam Platform</div>
                </div>

                <div className="flex items-center justify-center p-6">
                    <Card className="w-full max-w-md">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-2xl">Welcome back</CardTitle>
                            <CardDescription>Enter your credentials to continue.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {errorMessage ? (
                                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
                                    {errorMessage}
                                </div>
                            ) : null}

                            <form action={login} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="candidate@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                                        Password
                                    </label>
                                    <Input id="password" name="password" type="password" required />
                                </div>

                                <SubmitButton className="w-full" pendingText="Signing in...">Sign in</SubmitButton>
                            </form>

                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                New candidate? <Link href="/register" className="font-semibold text-primary hover:underline">Create an account</Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
