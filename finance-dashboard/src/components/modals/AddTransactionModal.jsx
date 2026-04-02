import { ModalOverlay }    from './ModalOverlay'
import { TransactionForm } from './TransactionForm'
import { useTransactions } from '../../context/TransactionContext'

export function AddTransactionModal({ onClose }) {
  const { addTransaction } = useTransactions()

  const handleSubmit = (form) => {
    addTransaction(form)
    onClose()
  }

  return (
    <ModalOverlay title="Add Transaction" onClose={onClose}>
      <TransactionForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Add Transaction"
      />
    </ModalOverlay>
  )
}
