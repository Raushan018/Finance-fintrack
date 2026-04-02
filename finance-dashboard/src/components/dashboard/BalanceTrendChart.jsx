import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts'
import { useMemo } from 'react'
import { groupByMonth } from '../../utils/transactionHelpers'
import { useTheme } from '../../context/ThemeContext'
import { CHART_THEME } from '../../data/chartTheme'
import { useCurrency } from '../../context/CurrencyContext'

function CustomTooltip({ active, payload, label, fmt }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div
      className="px-3 py-2.5 rounded-xl text-sm border"
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--border)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      <p className="font-semibold text-(--text-primary) mb-1.5">{label}</p>
      <div className="space-y-1">
        <p className="text-green-400 text-xs">Income: {fmt(d?.income ?? 0)}</p>
        <p className="text-red-400   text-xs">Expense: {fmt(d?.expense ?? 0)}</p>
        <p className="text-(--text-secondary) text-xs font-medium">
          Balance: {fmt(d?.balance ?? 0)}
        </p>
      </div>
    </div>
  )
}

export function BalanceTrendChart({ transactions }) {
  const { isDark } = useTheme()
  const { formatCmpct } = useCurrency()
  const data = useMemo(() => groupByMonth(transactions), [transactions])
  const gridColor = isDark ? CHART_THEME.gridColor : CHART_THEME.gridColorLight

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-semibold text-(--text-primary)">Balance Trend</p>
          <p className="text-xs text-(--text-muted) mt-0.5">Monthly overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-(--text-secondary)">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6366f1] inline-block" />
            Balance
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
            Expense
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#22c55e" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0}    />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: CHART_THEME.textColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: CHART_THEME.textColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => formatCmpct(v)}
          />
          <Tooltip content={<CustomTooltip fmt={formatCmpct} />} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={1.5}
            fill="url(#incomeGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#22c55e', strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
