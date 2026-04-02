import { useState, useMemo } from 'react'
import { PlusCircle } from 'lucide-react'
import { PageWrapper }          from '../components/layout/PageWrapper'
import { TransactionFilters }   from '../components/transactions/TransactionFilters'
import { TransactionsTable }    from '../components/transactions/TransactionsTable'
import { AddTransactionModal }  from '../components/modals/AddTransactionModal'
import { EditTransactionModal } from '../components/modals/EditTransactionModal'
import { Button }               from '../components/ui/Button'
import { useRole }              from '../context/RoleContext'
import { useTransactions }      from '../context/TransactionContext'
import { useFilters }           from '../context/FilterContext'
import { filterTransactions }   from '../utils/transactionHelpers'

export function TransactionsPage() {
  const { isAdmin } = useRole()
  const { transactions } = useTransactions()
  const { searchTerm, typeFilter } = useFilters()
  const [showAdd, setShowAdd]   = useState(false)
  const [editTx, setEditTx]     = useState(null)

  const filteredCount = useMemo(
    () => filterTransactions(transactions, { searchTerm, typeFilter }).length,
    [transactions, searchTerm, typeFilter]
  )

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {transactions.length} records total
          </p>
        </div>
        {isAdmin && (
          <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
            <PlusCircle size={14} />
            Add
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-4">
        <TransactionFilters
          total={transactions.length}
          filtered={filteredCount}
        />
      </div>

      {/* Table */}
      <TransactionsTable
        onEdit={setEditTx}
        onAdd={() => setShowAdd(true)}
      />

      {/* Modals */}
      {isAdmin && showAdd && (
        <AddTransactionModal onClose={() => setShowAdd(false)} />
      )}
      {isAdmin && editTx && (
        <EditTransactionModal tx={editTx} onClose={() => setEditTx(null)} />
      )}
    </PageWrapper>
  )
}
