import { useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { BalanceCard }      from './BalanceCard'
import { StatCard }         from './StatCard'
import { BalanceTrendChart } from './BalanceTrendChart'
import { CategoryDonutChart } from './CategoryDonutChart'
import { useTransactions }  from '../../context/TransactionContext'
import { calcTotals }       from '../../utils/transactionHelpers'
import { useInsights }      from '../../hooks/useInsights'

export function DashboardGrid() {
  const { transactions } = useTransactions()
  const { totalIncome, totalExpense, netBalance } = useMemo(
    () => calcTotals(transactions),
    [transactions]
  )
  const {
    currExpense, prevExpense, currIncome, prevExpense: prevExp,
    incomeCount, expenseCount, monthlyDelta,
  } = useInsights(transactions)

  const incomeDelta  = prevExp > 0 ? ((currIncome - prevExp) / prevExp * 100) : 0
  const expenseDelta = prevExpense > 0 ? ((currExpense - prevExpense) / prevExpense * 100) : 0

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Three equal stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BalanceCard
          netBalance={netBalance}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
        <StatCard
          label="Total Income"
          amount={totalIncome}
          icon={<ArrowDownLeft size={18} strokeWidth={2} />}
          color="green"
          count={incomeCount}
          delta={incomeDelta}
        />
        <StatCard
          label="Total Expense"
          amount={totalExpense}
          icon={<ArrowUpRight size={18} strokeWidth={2} />}
          color="red"
          count={expenseCount}
          delta={expenseDelta}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceTrendChart transactions={transactions} />
        </div>
        <div className="lg:col-span-1">
          <CategoryDonutChart transactions={transactions} />
        </div>
      </div>
    </div>
  )
}
