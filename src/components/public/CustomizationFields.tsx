import type { ProductCustomizationField } from '@/types/product'

type ValueMap = Record<string, string | string[]>

export default function CustomizationFields({
  fields,
  values,
  onChange,
}: {
  fields: ProductCustomizationField[]
  values: ValueMap
  onChange: (fieldId: string, value: string | string[]) => void
}) {
  if (!fields.length) return null

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-5">
      <h2 className="text-base font-bold text-[var(--color-text)] md:text-lg">
        خيارات المنتج وتخصيص الطلب
      </h2>

      <div className="mt-5 space-y-5">
        {fields.map((field, index) => {
          const current = values[field.id]

          return (
            <div
              key={field.id}
              className={index > 0 ? 'border-t border-[var(--color-border)] pt-5' : ''}
            >
              <p className="mb-3 text-sm font-semibold text-[var(--color-text)]">
                {field.label}
                {field.required ? ' (إلزامي)' : ''}
              </p>

              {field.type === 'single' ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {field.options?.map((option) => (
                    <label key={option.id} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={field.id}
                        checked={current === option.id}
                        onChange={() => onChange(field.id, option.id)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              ) : null}

              {field.type === 'multiple' ? (
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {field.options?.map((option) => {
                    const selected = Array.isArray(current) ? current : []
                    const checked = selected.includes(option.id)

                    return (
                      <label key={option.id} className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            onChange(
                              field.id,
                              checked
                                ? selected.filter((id) => id !== option.id)
                                : [...selected, option.id],
                            )
                          }
                        />
                        {option.label}
                      </label>
                    )
                  })}
                </div>
              ) : null}

              {field.type === 'text' ? (
                <input
                  type="text"
                  value={typeof current === 'string' ? current : ''}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  placeholder="أدخل تفاصيل إضافية إن وجدت"
                  className="h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm outline-none placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-text-muted)]"
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
