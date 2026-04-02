import { SearchX, PlusCircle } from 'lucide-react'
import { Button } from '../ui/Button'
import { useRole } from '../../context/RoleContext'

export function EmptyState({ hasFilters, onAddClick, onClearFilters }) {
  const { isAdmin } = useRole()

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-12 h-12 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-center mb-4">
          <SearchX size={22} className="text-[var(--text-muted)]" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
          No results found
        </p>
        <p className="text-xs text-[var(--text-muted)] mb-4 text-center max-w-xs">
          Try adjusting your search or clearing the filters to find what you're looking for.
        </p>
        <Button variant="outline" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-4">
        <PlusCircle size={26} className="text-[var(--accent)]" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
        No transactions yet
      </p>
      <p className="text-xs text-[var(--text-muted)] mb-4 text-center max-w-xs">
        {isAdmin
          ? "Add your first transaction to start tracking your finances."
          : "No transactions have been recorded yet."}
      </p>
      {isAdmin && onAddClick && (
        <Button variant="primary" size="sm" onClick={onAddClick}>
          <PlusCircle size={14} />
          Add transaction
        </Button>
      )}
    </div>
  )
}
