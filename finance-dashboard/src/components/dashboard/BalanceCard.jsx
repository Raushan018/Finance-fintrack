import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { useCurrency } from '../../context/CurrencyContext'

export function BalanceCard({ netBalance, totalIncome, totalExpense }) {
  const { format } = useCurrency()
  const isPositive = netBalance >= 0
  const savingsRate = totalIncome > 0
    ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1)
    : 0

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, var(--bg-surface) 60%)',
        border: '1px solid rgba(99,102,241,0.2)',
        boxShadow: '0 2px 12px rgba(99,102,241,0.08), 0 1px 3px rgba(0,0,0,0.1)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.18), 0 4px 12px rgba(0,0,0,0.15)'
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(99,102,241,0.08), 0 1px 3px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'
      }}
    >
      {/* Background glow orb */}
      <div
        className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-20 opacity-10"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)' }}
      />
      {/* Second subtle orb bottom-left */}
      <div
        className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-widest">
            Total Balance
          </p>
          {/* Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)' }}
          >
            <Wallet size={16} strokeWidth={1.75} style={{ color: '#6366f1' }} />
          </div>
        </div>

        {/* Balance value */}
        <div className="flex items-end gap-3">
          <AnimatedCounter
            value={netBalance}
            className="text-[2rem] font-bold tabular-nums tracking-tight leading-none"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>

        {/* Savings badge */}
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: isPositive ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              color: isPositive ? '#22c55e' : '#ef4444',
              border: `1px solid ${isPositive ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
            }}
          >
            {isPositive
              ? <TrendingUp size={11} strokeWidth={2.5} />
              : <TrendingDown size={11} strokeWidth={2.5} />
            }
            {Math.abs(savingsRate)}% savings rate
          </span>
        </div>

        {/* Income / Expense split */}
        <div
          className="flex gap-0 rounded-xl overflow-hidden mt-1"
          style={{ border: '1px solid var(--border)' }}
        >
          <div className="flex-1 px-3 py-2.5" style={{ background: 'rgba(34,197,94,0.05)' }}>
            <p className="text-[10px] text-(--text-muted) font-medium mb-0.5">Income</p>
            <p className="text-sm font-bold" style={{ color: '#22c55e' }}>
              {format(totalIncome)}
            </p>
          </div>
          <div style={{ width: 1, background: 'var(--border)' }} />
          <div className="flex-1 px-3 py-2.5" style={{ background: 'rgba(239,68,68,0.05)' }}>
            <p className="text-[10px] text-(--text-muted) font-medium mb-0.5">Expense</p>
            <p className="text-sm font-bold" style={{ color: '#ef4444' }}>
              {format(totalExpense)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
