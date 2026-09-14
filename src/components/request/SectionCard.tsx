import type { ReactNode } from 'react'

export default function SectionCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-4 w-1 rounded-sm bg-[var(--color-accent)]" />
        <h2 className="text-base font-bold text-[var(--color-text)] md:text-lg">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
