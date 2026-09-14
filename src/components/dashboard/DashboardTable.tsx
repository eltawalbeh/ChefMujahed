import type { ReactNode } from 'react'

export function DashboardTable({
  headers,
  children,
  minWidth = 860,
}: {
  headers: string[]
  children: ReactNode
  minWidth?: number
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <table
        className="w-full border-collapse text-right text-sm"
        style={{ minWidth }}
      >
        <thead className="bg-[var(--color-bg)] text-xs font-semibold text-[var(--color-text-muted)]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function DashboardTr({ children }: { children: ReactNode }) {
  return (
    <tr className="border-t border-[var(--color-border)] hover:bg-[rgba(248,242,234,.45)]">
      {children}
    </tr>
  )
}

export function DashboardTd({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <td className={`px-4 py-3.5 ${className}`}>{children}</td>
}
