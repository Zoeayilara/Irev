import * as React from "react"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "success" | "warning" | "danger" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"

    const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
        default: "bg-muted text-foreground",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-900/50",
        warning: "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900/50",
        danger: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-200 dark:border-red-900/50",
        outline: "bg-transparent text-foreground border border-border",
    }

    return <span className={`${base} ${variants[variant]} ${className || ""}`} {...props} />
}
