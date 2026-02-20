import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUserId } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const userId = await getCurrentUserId()
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="text-lg font-bold">Irev</div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200">
              Secure scholarship exam platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Take your exam with confidence</h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-xl">
              Irev helps candidates register, select a subject, and complete timed entrance exams in a clean and secure environment.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/register">
                <Button size="lg">Create account</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">Sign in</Button>
              </Link>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>What you can do</CardTitle>
              <CardDescription>In minutes, you’ll be ready to start.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-md border border-border bg-muted p-4">
                <div className="text-sm font-semibold">Register & login</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Create your candidate profile and access your dashboard.</div>
              </div>
              <div className="rounded-md border border-border bg-muted p-4">
                <div className="text-sm font-semibold">Select a subject</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Choose from available subjects and begin your exam.</div>
              </div>
              <div className="rounded-md border border-border bg-muted p-4">
                <div className="text-sm font-semibold">Timed exam flow</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Answer questions, submit, and view results when released.</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
