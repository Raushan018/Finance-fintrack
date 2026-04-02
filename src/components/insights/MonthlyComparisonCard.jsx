import { TrendingUp, TrendingDown, Minus, CalendarDays } from 'lucide-react'
import { useCurrency } from '../../context/CurrencyContext'

export function MonthlyComparisonCard({ currExpense, prevExpense, monthlyDelta }) {
  const { format } = useCurrency()
  const improved = monthlyDelta <= 0
  const noChange = monthlyDelta === 0

  const TrendIcon  = noChange ? Minus : (improved ? TrendingDown : TrendingUp)
  const trendColor = noChange ? 'var(--text-muted)' : (improved ? '#22c55e' : '#ef4444')
  const trendBg    = noChange ? 'rgba(255,255,255,0.04)' : (improved ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)')
  const trendBorder= noChange ? 'var(--border)' : (improved ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)')
  const trendLabel = noChange
    ? 'Same as last month'
    : improved
      ? `${Math.abs(monthlyDelta).toFixed(1)}% less than last month`
      : `${Math.abs(monthlyDelta).toFixed(1)}% more than last month`

  /* Comparison bar widths */
  const maxVal    = Math.max(currExpense, prevExpense, 0.01)
  const currPct   = (currExpense / maxVal) * 100
  const prevPct   = (prevExpense / maxVal) * 100

  return (
    <div
      className="card p-5 h-full flex flex-col"
      style={{ minHeight: 340 }}
    >
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex items-center gap-2.5 mb-5">
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: trendBg,
          border: `1px solid ${trendBorder}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <TrendIcon size={14} strokeWidth={2} color={trendColor} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Monthly Comparison
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.2 }}>
            Expense trend
          </p>
        </div>
      </div>

      {/* ── This / Last month boxes ───────────────────── */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'This month', value: currExpense, isActive: true  },
          { label: 'Last month', value: prevExpense, isActive: false },
        ].map(({ label, value, isActive }) => (
          <div
            key={label}
            className="p-3.5 rounded-xl flex flex-col gap-1"
            style={{
              background:   isActive ? 'rgba(99,102,241,0.07)' : 'var(--bg-base)',
              border:       `1px solid ${isActive ? 'rgba(99,102,241,0.2)' : 'var(--border)'}`,
            }}
          >
            <div className="flex items-center gap-1.5">
              <CalendarDays size={10} strokeWidth={2} style={{ color: 'var(--text-muted)' }} />
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {label}
              </p>
            </div>
            <p
              className="text-xl font-bold tabular-nums"
              style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', letterSpacing: '-0.5px' }}
            >
              {format(value)}
            </p>
            <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>expense</p>
          </div>
        ))}
      </div>

      {/* ── Visual bar comparison ─────────────────────── */}
      <div className="flex flex-col gap-3 mb-5 flex-1">
        {[
          { label: 'This month', pct: currPct, color: '#6366f1'  },
          { label: 'Last month', pct: prevPct, color: 'var(--text-muted)' },
        ].map(({ label, pct, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {label}
              </span>
              <span className="text-[10px] font-semibold tabular-nums" style={{ color }}>
                {pct.toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Trend summary badge ───────────────────────── */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-auto"
        style={{ background: trendBg, border: `1px solid ${trendBorder}` }}
      >
        <TrendIcon size={13} strokeWidth={2.5} color={trendColor} />
        <p className="text-xs font-semibold" style={{ color: trendColor }}>{trendLabel}</p>
      </div>
    </div>
  )
}
