import { cn } from '@/lib/helpers'

type Category = {
  id: string
  label: string
}

export default function CategoryChips({
  categories,
  activeId,
  onChange,
}: {
  categories: Category[]
  activeId: string
  onChange: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-2">
        {categories.map((category) => {
          const active = category.id === activeId
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={cn(
                'h-10 rounded-full border px-4 text-xs font-semibold transition-colors',
                active
                  ? 'border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-on-primary)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]',
              )}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
