import { TrendingUp, TrendingDown } from 'lucide-react'
import { useCurrency } from '../../context/CurrencyContext'

const PALETTE = {
  green: {
    accent:       '#22c55e',
    iconBg:       'rgba(34,197,94,0.12)',
    iconBorder:   'rgba(34,197,94,0.22)',
    gradientFrom: 'rgba(34,197,94,0.07)',
    glow:         'rgba(34,197,94,0.15)',
    hoverBorder:  'rgba(34,197,94,0.4)',
    hoverShadow:  '0 12px 32px rgba(34,197,94,0.14), 0 4px 12px rgba(0,0,0,0.12)',
    hoverOrb:     'rgba(34,197,94,0.18)',
  },
  red: {
    accent:       '#ef4444',
    iconBg:       'rgba(239,68,68,0.12)',
    iconBorder:   'rgba(239,68,68,0.22)',
    gradientFrom: 'rgba(239,68,68,0.07)',
    glow:         'rgba(239,68,68,0.12)',
    hoverBorder:  'rgba(239,68,68,0.4)',
    hoverShadow:  '0 12px 32px rgba(239,68,68,0.12), 0 4px 12px rgba(0,0,0,0.12)',
    hoverOrb:     'rgba(239,68,68,0.18)',
  },
}

export function StatCard({ label, amount, icon, color = 'green', count, delta }) {
  const { format } = useCurrency()
  const p = PALETTE[color] ?? PALETTE.green
  const isUp = delta >= 0

  const defaultShadow = `0 2px 12px ${p.glow}, 0 1px 3px rgba(0,0,0,0.08)`
  const defaultBorder = `rgba(${color === 'green' ? '34,197,94' : '239,68,68'},0.18)`

  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-6 h-full flex flex-col justify-between"
      style={{
        background: `linear-gradient(135deg, ${p.gradientFrom} 0%, var(--bg-surface) 55%)`,
        border: `1px solid ${defaultBorder}`,
        boxShadow: defaultShadow,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = p.hoverShadow
        e.currentTarget.style.borderColor = p.hoverBorder
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = defaultShadow
        e.currentTarget.style.borderColor = defaultBorder
      }}
    >
      {/* Background glow orb */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle, ${p.hoverOrb}, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header: label + icon */}
        <div className="flex items-start justify-between">
          <p className="text-[11px] font-semibold text-(--text-muted) uppercase tracking-widest">
            {label}
          </p>
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{
              background: p.iconBg,
              border: `1px solid ${p.iconBorder}`,
            }}
          >
            <span style={{ color: p.accent }}>{icon}</span>
          </div>
        </div>

        {/* Amount */}
        <p
          className="text-[2rem] font-bold tabular-nums tracking-tight leading-none"
          style={{ color: p.accent }}
        >
          {format(amount)}
        </p>

        {/* Footer: count + delta */}
        <div className="flex items-center justify-between mt-1">
          {count !== undefined && (
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {count} transactions
            </span>
          )}
          {delta !== undefined && (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: isUp ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)',
                color: isUp ? '#22c55e' : '#ef4444',
                border: `1px solid ${isUp ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}
            >
              {isUp
                ? <TrendingUp  size={10} strokeWidth={2.5} />
                : <TrendingDown size={10} strokeWidth={2.5} />
              }
              {isUp ? '+' : ''}{delta.toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line — slides in on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
      />
    </div>
  )
}
