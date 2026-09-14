export default function B2BStepIndicator({ step, title }: { step: 1 | 2 | 3; title: string }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4"><span className="text-sm text-[var(--color-text-muted)]">الخطوة {step} من 3</span><h1 className="text-lg font-bold md:text-2xl">{title}</h1></div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        {[1, 2, 3].map((value) => <span key={value} className={`h-1 rounded-full ${value <= step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border)]'}`} />)}
      </div>
    </div>
  )
}
