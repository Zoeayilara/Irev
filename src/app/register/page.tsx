import { register } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function getErrorMessage(error?: string) {
    if (!error) return null
    if (error === 'missing') return 'Please fill in the required fields.'
    if (error === 'exists') return 'An account with this email already exists. Please login.'
    if (error === 'reset') return 'This email already exists. Please create a password to continue.'
    if (error === 'nomatch') return 'Passwords do not match.'
    return 'Unable to register. Please try again.'
}

export default function RegisterPage({
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
                        <div className="text-4xl font-bold tracking-tight text-slate-900">Create account</div>
                        <div className="text-slate-600 max-w-md">
                            Register once, then you’ll be able to select your subject and take your entrance exam.
                        </div>
                    </div>
                    <div className="text-xs text-slate-500">Use a valid email address. Your results are released 24 hours after submission.</div>
                </div>

                <div className="flex items-center justify-center p-6">
                    <Card className="w-full max-w-md">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-2xl">Candidate Registration</CardTitle>
                            <CardDescription>Fill in your details to create your account.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {errorMessage ? (
                                <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
                                    {errorMessage}
                                </div>
                            ) : null}

                            <form action={register} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full name</label>
                                    <Input id="fullName" name="fullName" type="text" placeholder="Your name" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                                    <Input id="email" name="email" type="email" placeholder="candidate@example.com" required />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                                    <Input id="password" name="password" type="password" required />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm password</label>
                                    <Input id="confirmPassword" name="confirmPassword" type="password" required />
                                </div>

                                <Button className="w-full">Create account</Button>
                            </form>

                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                Already have an account? <Link href="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
