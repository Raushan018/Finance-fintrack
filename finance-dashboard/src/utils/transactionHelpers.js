import { getMonthKey, monthKeyToLabel } from './formatDate'

/**
 * Filter transactions by search term and type.
 * @param {Array}  transactions
 * @param {Object} filters - { searchTerm, typeFilter }
 * @returns {Array}
 */
export function filterTransactions(transactions, { searchTerm = '', typeFilter = 'all' } = {}) {
  const term = searchTerm.trim().toLowerCase()
  return transactions.filter(tx => {
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false
    if (!term) return true
    return (
      tx.description.toLowerCase().includes(term) ||
      tx.category.toLowerCase().includes(term) ||
      String(tx.amount).includes(term) ||
      (tx.note && tx.note.toLowerCase().includes(term))
    )
  })
}

/**
 * Sort transactions by a field.
 * @param {Array}  transactions
 * @param {Object} sort - { sortField: 'date'|'amount', sortDirection: 'asc'|'desc' }
 * @returns {Array} new sorted array
 */
export function sortTransactions(transactions, { sortField = 'date', sortDirection = 'desc' } = {}) {
  return [...transactions].sort((a, b) => {
    let valA, valB
    if (sortField === 'date') {
      valA = a.date
      valB = b.date
    } else if (sortField === 'amount') {
      valA = a.amount
      valB = b.amount
    } else {
      valA = a.createdAt
      valB = b.createdAt
    }
    if (valA < valB) return sortDirection === 'asc' ? -1 : 1
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1
    // Tiebreak by createdAt descending
    return b.createdAt - a.createdAt
  })
}

/**
 * Group transactions by month, returning an array of monthly summaries
 * sorted chronologically ascending (oldest first), for charts.
 * @param {Array} transactions
 * @returns {Array<{monthKey, label, income, expense, balance}>}
 */
export function groupByMonth(transactions) {
  const map = {}

  for (const tx of transactions) {
    const key = getMonthKey(tx.date)
    if (!map[key]) {
      map[key] = { monthKey: key, label: monthKeyToLabel(tx.date), income: 0, expense: 0 }
    }
    if (tx.type === 'income') {
      map[key].income += tx.amount
    } else {
      map[key].expense += tx.amount
    }
  }

  return Object.values(map)
    .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
    .map(m => ({ ...m, balance: m.income - m.expense }))
}

/**
 * Group expense transactions by category, returning totals per category.
 * @param {Array} transactions
 * @returns {Array<{category, total}>} sorted by total descending
 */
export function groupExpensesByCategory(transactions) {
  const map = {}
  for (const tx of transactions.filter(t => t.type === 'expense')) {
    map[tx.category] = (map[tx.category] ?? 0) + tx.amount
  }
  return Object.entries(map)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}

/**
 * Calculate total income, total expense, and net balance.
 * @param {Array} transactions
 * @returns {{ totalIncome, totalExpense, netBalance }}
 */
export function calcTotals(transactions) {
  let totalIncome = 0
  let totalExpense = 0
  for (const tx of transactions) {
    if (tx.type === 'income') totalIncome += tx.amount
    else totalExpense += tx.amount
  }
  return { totalIncome, totalExpense, netBalance: totalIncome - totalExpense }
}

/**
 * Generate a unique transaction ID.
 */
export function generateId() {
  return `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}
