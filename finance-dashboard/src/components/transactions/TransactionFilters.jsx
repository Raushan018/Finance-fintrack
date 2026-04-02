import { Search, X } from 'lucide-react'
import { useFilters } from '../../context/FilterContext'

const TABS = [
  { value: 'all',     label: 'All'      },
  { value: 'income',  label: 'Income'   },
  { value: 'expense', label: 'Expense'  },
]

export function TransactionFilters({ total, filtered }) {
  const { searchTerm, setSearchTerm, typeFilter, setTypeFilter, resetFilters } = useFilters()
  const hasActiveFilters = searchTerm || typeFilter !== 'all'

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-0 max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          strokeWidth={2}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search transactions…"
          className="
            w-full pl-9 pr-8 py-2 text-sm rounded-lg
            bg-[var(--bg-elevated)] border border-[var(--border)]
            text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
            focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30
            transition-all duration-150
          "
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X size={13} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Type filter tabs */}
      <div
        className="flex items-center gap-0.5 p-0.5 rounded-lg"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
        role="group"
        aria-label="Filter by type"
      >
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTypeFilter(value)}
            className={[
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 cursor-pointer',
              typeFilter === value
                ? 'bg-[var(--accent)] text-white shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Result count + clear */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-[var(--text-muted)]">
          {filtered} of {total}
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-[var(--accent)] hover:underline cursor-pointer transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
