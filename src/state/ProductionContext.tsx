import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getProductionSession,
  productionLogin,
  productionLogout,
} from '@/data/production'
import type { ProductionSession } from '@/types/production'

const SESSION_KEY = 'chef-mujahed:production-session:v1'
const DEVICE_KEY = 'chef-mujahed:production-device:v1'

type ContextValue = {
  session: ProductionSession | null
  loading: boolean
  login: (pin: string) => Promise<void>
  logout: () => Promise<void>
}

const ProductionContext = createContext<ContextValue | null>(null)

function deviceKey() {
  const existing = localStorage.getItem(DEVICE_KEY)
  if (existing) return existing
  const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`
  localStorage.setItem(DEVICE_KEY, id)
  return id
}

export function ProductionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ProductionSession | null>(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(Boolean(session))

  useEffect(() => {
    if (!session) return
    let active = true
    void getProductionSession(session.token)
      .then((info) => {
        if (!active) return
        const next = { token: session.token, expiresAt: info.expiresAt, stationName: info.stationName }
        setSession(next)
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(next))
      })
      .catch(() => {
        if (!active) return
        setSession(null)
        sessionStorage.removeItem(SESSION_KEY)
      })
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  const login = useCallback(async (pin: string) => {
    const next = await productionLogin(pin, deviceKey())
    setSession(next)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next))
  }, [])

  const logout = useCallback(async () => {
    const current = session
    setSession(null)
    sessionStorage.removeItem(SESSION_KEY)
    if (current) {
      try { await productionLogout(current.token) } catch { /* local logout still succeeds */ }
    }
  }, [session])

  const value = useMemo(() => ({ session, loading, login, logout }), [session, loading, login, logout])
  return <ProductionContext.Provider value={value}>{children}</ProductionContext.Provider>
}

export function useProduction() {
  const value = useContext(ProductionContext)
  if (!value) throw new Error('useProduction must be used inside ProductionProvider')
  return value
}
