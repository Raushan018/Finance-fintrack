import { TopCategoryCard }       from './TopCategoryCard'
import { MonthlyComparisonCard } from './MonthlyComparisonCard'
import { TransactionCountCard }  from './TransactionCountCard'
import { useInsights }           from '../../hooks/useInsights'
import { useTransactions }       from '../../context/TransactionContext'

export function InsightsPanel() {
  const { transactions } = useTransactions()
  const {
    topCategory,
    expensesByCategory,
    currExpense,
    prevExpense,
    monthlyDelta,
    totalCount,
    incomeCount,
    expenseCount,
  } = useInsights(transactions)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch animate-slide-up">
      <TopCategoryCard
        topCategory={topCategory}
        allExpenses={expensesByCategory}
      />
      <MonthlyComparisonCard
        currExpense={currExpense}
        prevExpense={prevExpense}
        monthlyDelta={monthlyDelta}
      />
      <TransactionCountCard
        totalCount={totalCount}
        incomeCount={incomeCount}
        expenseCount={expenseCount}
      />
    </div>
  )
}
