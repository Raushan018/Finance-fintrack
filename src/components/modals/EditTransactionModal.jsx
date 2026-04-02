import { ModalOverlay }    from './ModalOverlay'
import { TransactionForm } from './TransactionForm'
import { useTransactions } from '../../context/TransactionContext'

export function EditTransactionModal({ tx, onClose }) {
  const { updateTransaction } = useTransactions()

  const handleSubmit = (form) => {
    updateTransaction(tx.id, form)
    onClose()
  }

  return (
    <ModalOverlay title="Edit Transaction" onClose={onClose}>
      <TransactionForm
        initial={tx}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Save Changes"
      />
    </ModalOverlay>
  )
}
