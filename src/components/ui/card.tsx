import * as React from "react"

type DivProps = React.HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: DivProps) {
    return (
        <div
            className={`rounded-xl border border-border bg-card text-foreground shadow-sm ${className || ""}`}
            {...props}
        />
    )
}

export function CardHeader({ className, ...props }: DivProps) {
    return <div className={`p-6 pb-2 ${className || ""}`} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h2 className={`text-xl font-bold ${className || ""}`} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={`text-sm text-slate-600 dark:text-slate-300 ${className || ""}`} {...props} />
}

export function CardContent({ className, ...props }: DivProps) {
    return <div className={`p-6 pt-4 ${className || ""}`} {...props} />
}

export function CardFooter({ className, ...props }: DivProps) {
    return <div className={`p-6 pt-2 ${className || ""}`} {...props} />
}
