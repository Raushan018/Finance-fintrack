import { useMemo } from 'react'
import { getMonthKey, currentMonthKey, prevMonthKey } from '../utils/formatDate'
import { groupExpensesByCategory, calcTotals } from '../utils/transactionHelpers'
import { getCategory } from '../utils/categoryHelpers'

/**
 * Derives insight metrics from a transactions array.
 * @param {Array} transactions
 * @returns insight object
 */
export function useInsights(transactions) {
  return useMemo(() => {
    const currKey = currentMonthKey()
    const prevKey = prevMonthKey()

    const currMonth = transactions.filter(tx => getMonthKey(tx.date) === currKey)
    const prevMonth = transactions.filter(tx => getMonthKey(tx.date) === prevKey)

    const { totalIncome, totalExpense, netBalance } = calcTotals(transactions)
    const { totalExpense: currExpense } = calcTotals(currMonth)
    const { totalExpense: prevExpense } = calcTotals(prevMonth)
    const { totalIncome: currIncome } = calcTotals(currMonth)

    const monthlyDelta = prevExpense === 0
      ? 0
      : ((currExpense - prevExpense) / prevExpense) * 100

    const expensesByCategory = groupExpensesByCategory(transactions)
    const topCategory = expensesByCategory[0]
      ? {
          ...getCategory(expensesByCategory[0].category),
          total: expensesByCategory[0].total,
          slug: expensesByCategory[0].category,
        }
      : null

    const incomeCount  = transactions.filter(t => t.type === 'income').length
    const expenseCount = transactions.filter(t => t.type === 'expense').length

    return {
      totalIncome,
      totalExpense,
      netBalance,
      currExpense,
      prevExpense,
      currIncome,
      monthlyDelta,
      topCategory,
      expensesByCategory,
      incomeCount,
      expenseCount,
      totalCount: transactions.length,
    }
  }, [transactions])
}
