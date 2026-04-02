import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  formatCurrency as fmt,
  formatAmount   as fmtAmt,
  formatCompact  as fmtCompact,
} from '../utils/formatCurrency'

const CurrencyContext = createContext(null)

export const CURRENCIES = [
  { code: 'USD', label: 'USD', symbol: '$', flag: '🇺🇸', name: 'US Dollar'     },
  { code: 'INR', label: 'INR', symbol: '₹', flag: '🇮🇳', name: 'Indian Rupee'  },
]

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useLocalStorage('fd_currency', 'USD')

  const isINR = currency === 'INR'

  /** Format a plain amount */
  const format      = (amount)        => fmt(amount, currency)
  /** Format with +/− sign by transaction type */
  const formatAmt   = (amount, type)  => fmtAmt(amount, type, currency)
  /** Compact format (₹1.2L / $12.4k) */
  const formatCmpct = (amount)        => fmtCompact(amount, currency)

  const currencyMeta = CURRENCIES.find(c => c.code === currency) ?? CURRENCIES[0]

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, isINR, currencyMeta, format, formatAmt, formatCmpct }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext)
  if (!ctx) throw new Error('useCurrency must be inside CurrencyProvider')
  return ctx
}
