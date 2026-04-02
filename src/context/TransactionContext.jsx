import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockTransactions } from '../data/mockTransactions'
import { generateId } from '../utils/transactionHelpers'

const TransactionContext = createContext(null)

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage(
    'fd_transactions',
    mockTransactions
  )

  const addTransaction = (payload) => {
    const newTx = {
      ...payload,
      id: generateId(),
      createdAt: Date.now(),
      amount: parseFloat(payload.amount),
    }
    setTransactions(prev => [newTx, ...prev])
  }

  const updateTransaction = (id, patch) => {
    setTransactions(prev =>
      prev.map(tx =>
        tx.id === id
          ? { ...tx, ...patch, amount: parseFloat(patch.amount ?? tx.amount) }
          : tx
      )
    )
  }

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const ctx = useContext(TransactionContext)
  if (!ctx) throw new Error('useTransactions must be inside TransactionProvider')
  return ctx
}
