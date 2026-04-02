import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

export function SortableHeader({ label, field, sortField, sortDirection, onSort, className = '' }) {
  const isActive = sortField === field

  return (
    <th
      className={[
        'px-4 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider',
        'cursor-pointer select-none whitespace-nowrap group',
        className,
      ].join(' ')}
      onClick={() => onSort(field)}
      aria-sort={isActive ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <div className="flex items-center gap-1.5">
        <span className={isActive ? 'text-[var(--text-secondary)]' : 'group-hover:text-[var(--text-secondary)] transition-colors'}>
          {label}
        </span>
        <span className={isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity'}>
          {isActive
            ? (sortDirection === 'asc'
                ? <ArrowUp   size={11} strokeWidth={2.5} />
                : <ArrowDown size={11} strokeWidth={2.5} />
              )
            : <ArrowUpDown size={11} strokeWidth={2} />
          }
        </span>
      </div>
    </th>
  )
}
