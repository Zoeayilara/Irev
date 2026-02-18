import * as React from "react"

type TableProps = React.TableHTMLAttributes<HTMLTableElement>

type SectionProps = React.HTMLAttributes<HTMLTableSectionElement>

type RowProps = React.HTMLAttributes<HTMLTableRowElement>

type CellProps = React.TdHTMLAttributes<HTMLTableCellElement>

type HeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement>

export function Table({ className, ...props }: TableProps) {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
            <table className={`w-full border-collapse ${className || ""}`} {...props} />
        </div>
    )
}

export function TableHeader({ className, ...props }: SectionProps) {
    return <thead className={`${className || ""}`} {...props} />
}

export function TableBody({ className, ...props }: SectionProps) {
    return <tbody className={`${className || ""}`} {...props} />
}

export function TableRow({ className, ...props }: RowProps) {
    return <tr className={`border-b border-border last:border-0 ${className || ""}`} {...props} />
}

export function TableHead({ className, ...props }: HeaderCellProps) {
    return (
        <th
            className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-slate-300 ${className || ""}`}
            {...props}
        />
    )
}

export function TableCell({ className, ...props }: CellProps) {
    return <td className={`px-4 py-3 text-sm text-foreground ${className || ""}`} {...props} />
}
