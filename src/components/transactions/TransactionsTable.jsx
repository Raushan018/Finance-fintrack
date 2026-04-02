import { useMemo } from 'react'
import { SortableHeader }    from './SortableHeader'
import { TransactionRow }    from './TransactionRow'
import { EmptyState }        from './EmptyState'
import { useTransactions }   from '../../context/TransactionContext'
import { useFilters }        from '../../context/FilterContext'
import { filterTransactions, sortTransactions } from '../../utils/transactionHelpers'

export function TransactionsTable({ onEdit, onAdd }) {
  const { transactions, deleteTransaction } = useTransactions()
  const { searchTerm, typeFilter, sortField, sortDirection, toggleSort, resetFilters } = useFilters()

  const displayed = useMemo(() => {
    const filtered = filterTransactions(transactions, { searchTerm, typeFilter })
    return sortTransactions(filtered, { sortField, sortDirection })
  }, [transactions, searchTerm, typeFilter, sortField, sortDirection])

  const hasFilters = Boolean(searchTerm || typeFilter !== 'all')

  return (
    <div className="card overflow-hidden">
      {displayed.length === 0 ? (
        <EmptyState
          hasFilters={hasFilters}
          onAddClick={onAdd}
          onClearFilters={resetFilters}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-elevated)]/50">
                {/* Spacer for accent bar */}
                <th className="w-0 p-0" />
                <SortableHeader
                  label="Date"
                  field="date"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                />
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Type
                </th>
                <SortableHeader
                  label="Amount"
                  field="amount"
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={toggleSort}
                  className="text-right"
                />
                <th className="px-4 py-3 w-20" />
              </tr>
            </thead>
            <tbody>
              {displayed.map(tx => (
                <TransactionRow
                  key={tx.id}
                  tx={tx}
                  onEdit={onEdit}
                  onDelete={deleteTransaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
