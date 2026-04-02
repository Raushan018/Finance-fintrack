import { ArrowDownLeft, ArrowUpRight, Hash } from 'lucide-react'

export function TransactionCountCard({ totalCount, incomeCount, expenseCount }) {
  const incomeRatio  = totalCount > 0 ? (incomeCount  / totalCount) * 100 : 0
  const expenseRatio = totalCount > 0 ? (expenseCount / totalCount) * 100 : 0

  return (
    <div
      className="card p-5 h-full flex flex-col"
      style={{ minHeight: 340 }}
    >
      {/* ── Header ───────────────────────────────────── */}
      <div className="flex items-center gap-2.5 mb-5">
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Hash size={14} strokeWidth={2} color="#6366f1" />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}>
            Transaction Breakdown
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.2 }}>
            Count by type
          </p>
        </div>
      </div>

      {/* ── Total count hero ──────────────────────────── */}
      <div
        className="flex flex-col items-center justify-center py-5 rounded-xl mb-5"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.04))',
          border: '1px solid rgba(99,102,241,0.18)',
        }}
      >
        <p
          className="tabular-nums font-black"
          style={{ fontSize: 52, lineHeight: 1, color: 'var(--text-primary)', letterSpacing: '-2px' }}
        >
          {totalCount}
        </p>
        <p className="text-xs font-medium mt-1.5" style={{ color: 'var(--text-muted)' }}>
          total transactions
        </p>
      </div>

      {/* ── Income / Expense breakdown ────────────────── */}
      <div className="flex flex-col gap-4 flex-1">
        {[
          {
            label: 'Income',
            count: incomeCount,
            ratio: incomeRatio,
            Icon:  ArrowDownLeft,
            color: '#22c55e',
            bg:    'rgba(34,197,94,0.08)',
            border:'rgba(34,197,94,0.2)',
            bar:   'linear-gradient(90deg, #16a34a, #22c55e)',
          },
          {
            label: 'Expense',
            count: expenseCount,
            ratio: expenseRatio,
            Icon:  ArrowUpRight,
            color: '#ef4444',
            bg:    'rgba(239,68,68,0.08)',
            border:'rgba(239,68,68,0.2)',
            bar:   'linear-gradient(90deg, #dc2626, #ef4444)',
          },
        ].map(({ label, count, ratio, Icon, color, bg, border, bar }) => (
          <div key={label}>
            {/* Label row */}
            <div className="flex items-center justify-between mb-2">
              <div
                className="flex items-center gap-2 px-2.5 py-1 rounded-lg"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon size={12} strokeWidth={2.5} color={color} />
                <span className="text-xs font-semibold" style={{ color }}>{label}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold tabular-nums" style={{ color }}>
                  {count}
                </span>
                <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>
                  ({ratio.toFixed(0)}%)
                </span>
              </div>
            </div>
            {/* Bar */}
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${ratio}%`, background: bar }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Split visual ──────────────────────────────── */}
      <div
        className="flex rounded-xl overflow-hidden mt-5"
        style={{ height: 6, background: 'var(--bg-elevated)' }}
      >
        <div
          style={{
            width: `${incomeRatio}%`,
            background: 'linear-gradient(90deg, #16a34a, #22c55e)',
            transition: 'width 0.7s ease',
          }}
        />
        <div style={{ width: 2, background: 'var(--bg-surface)', flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(90deg, #dc2626, #ef4444)',
            transition: 'width 0.7s ease',
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px]" style={{ color: '#22c55e' }}>Income {incomeRatio.toFixed(0)}%</span>
        <span className="text-[10px]" style={{ color: '#ef4444' }}>Expense {expenseRatio.toFixed(0)}%</span>
      </div>
    </div>
  )
}
