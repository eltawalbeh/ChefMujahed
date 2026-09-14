export type BackendErrorKind =
  | 'AUTH'
  | 'PERMISSION'
  | 'VALIDATION'
  | 'CONFLICT'
  | 'NOT_FOUND'
  | 'NETWORK'
  | 'UNKNOWN'

export class BackendError extends Error {
  kind: BackendErrorKind
  code?: string
  details?: string
  hint?: string

  constructor(
    message: string,
    options: {
      kind?: BackendErrorKind
      code?: string
      details?: string
      hint?: string
      cause?: unknown
    } = {},
  ) {
    super(message, { cause: options.cause })
    this.name = 'BackendError'
    this.kind = options.kind ?? 'UNKNOWN'
    this.code = options.code
    this.details = options.details
    this.hint = options.hint
  }
}

function errorKind(code?: string, message = ''): BackendErrorKind {
  const normalized = `${code ?? ''} ${message}`.toLowerCase()

  if (
    normalized.includes('jwt') ||
    normalized.includes('not authenticated') ||
    normalized.includes('auth session')
  ) return 'AUTH'

  if (
    normalized.includes('permission denied') ||
    normalized.includes('not authorized') ||
    normalized.includes('insufficient_privilege') ||
    code === '42501'
  ) return 'PERMISSION'

  if (
    normalized.includes('duplicate') ||
    normalized.includes('unique') ||
    code === '23505'
  ) return 'CONFLICT'

  if (
    normalized.includes('not found') ||
    code === 'PGRST116'
  ) return 'NOT_FOUND'

  if (
    normalized.includes('check constraint') ||
    normalized.includes('invalid') ||
    normalized.includes('required') ||
    code === '23514' ||
    code === '22P02'
  ) return 'VALIDATION'

  if (
    normalized.includes('failed to fetch') ||
    normalized.includes('network') ||
    normalized.includes('timeout')
  ) return 'NETWORK'

  return 'UNKNOWN'
}

export function toBackendError(error: unknown, fallback = 'تعذر إكمال العملية حالياً.') {
  if (error instanceof BackendError) return error

  const source = error && typeof error === 'object'
    ? error as Record<string, unknown>
    : {}

  const message = String(source.message ?? (error instanceof Error ? error.message : '')).trim()
  const code = source.code == null ? undefined : String(source.code)
  const details = source.details == null ? undefined : String(source.details)
  const hint = source.hint == null ? undefined : String(source.hint)

  return new BackendError(message || fallback, {
    kind: errorKind(code, message),
    code,
    details,
    hint,
    cause: error,
  })
}
