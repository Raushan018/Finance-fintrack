import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { useMemo } from 'react'
import { groupExpensesByCategory } from '../../utils/transactionHelpers'
import { getCategoryColor, getCategoryLabel } from '../../utils/categoryHelpers'
import { useCurrency } from '../../context/CurrencyContext'

function CustomTooltip({ active, payload, fmt }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div
      className="px-3 py-2 rounded-xl text-sm border"
      style={{
        background: 'var(--bg-elevated)',
        borderColor: 'var(--border)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      }}
    >
      <p className="font-semibold text-(--text-primary)">{name}</p>
      <p className="text-(--text-secondary) text-xs mt-0.5">{fmt(value)}</p>
    </div>
  )
}

export function CategoryDonutChart({ transactions }) {
  const { format } = useCurrency()

  const data = useMemo(() => {
    const grouped = groupExpensesByCategory(transactions).slice(0, 6)
    return grouped.map(({ category, total }) => ({
      name:  getCategoryLabel(category),
      value: total,
      color: getCategoryColor(category),
      slug:  category,
    }))
  }, [transactions])

  if (data.length === 0) {
    return (
      <div className="card p-5 flex flex-col items-center justify-center min-h-[240px]">
        <p className="text-(--text-muted) text-sm">No expense data yet</p>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-(--text-primary)">Spending by Category</p>
        <p className="text-xs text-(--text-muted) mt-0.5">Top expense categories</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
            animationBegin={0}
            animationDuration={800}
          >
            {data.map((entry) => (
              <Cell key={entry.slug} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip fmt={format} />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 space-y-1.5">
        {data.map(({ name, color, value }) => (
          <div key={name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs text-(--text-secondary)">{name}</span>
            </div>
            <span className="text-xs font-medium text-(--text-primary) tabular-nums">
              {format(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
