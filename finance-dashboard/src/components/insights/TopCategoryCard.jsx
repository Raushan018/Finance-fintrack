import { CategoryIcon } from '../ui/CategoryIcon'
import { Trophy } from 'lucide-react'
import { getCategoryColor } from '../../utils/categoryHelpers'
import { useCurrency } from '../../context/CurrencyContext'

export function TopCategoryCard({ topCategory, allExpenses }) {
  const { format } = useCurrency()
  const total = allExpenses.reduce((s, e) => s + e.total, 0)

  return (
    <div
      className="card p-5 h-full flex flex-col"
      style={{ minHeight: 340 }}
    >
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex items-center gap-2.5 mb-5">
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'rgba(234,179,8,0.12)',
          border: '1px solid rgba(234,179,8,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Trophy size={14} strokeWidth={2} color="#eab308" />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Top Spending
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.2 }}>
            Highest expense category
          </p>
        </div>
      </div>

      {!topCategory ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No expense data yet</p>
        </div>
      ) : (
        <>
          {/* ── Top category highlight ─────────────────── */}
          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-5"
            style={{
              background: topCategory.color + '12',
              border: `1px solid ${topCategory.color}30`,
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: topCategory.color + '20',
              border: `1px solid ${topCategory.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CategoryIcon name={topCategory.icon} size={18} className={topCategory.textColor} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold ${topCategory.textColor}`}>{topCategory.label}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {format(topCategory.total)}
              </p>
            </div>
            <div style={{
              padding: '3px 8px', borderRadius: 20,
              background: topCategory.color + '18',
              border: `1px solid ${topCategory.color}30`,
            }}>
              <span className={`text-xs font-bold ${topCategory.textColor}`}>
                {total > 0 ? ((topCategory.total / total) * 100).toFixed(0) : 0}%
              </span>
            </div>
          </div>

          {/* ── Category breakdown bars ────────────────── */}
          <div className="flex flex-col gap-3 flex-1">
            {allExpenses.slice(0, 5).map(({ category, total: catTotal }) => {
              const pct   = total > 0 ? (catTotal / total) * 100 : 0
              const color = getCategoryColor(category)
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium capitalize" style={{ color: 'var(--text-secondary)' }}>
                      {category}
                    </span>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
                      {format(catTotal)}
                    </span>
                  </div>
                  <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}cc, ${color})` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
