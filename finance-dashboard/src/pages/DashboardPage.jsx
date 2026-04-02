import { PageWrapper } from '../components/layout/PageWrapper'
import { DashboardGrid } from '../components/dashboard/DashboardGrid'

export function DashboardPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          Overview
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          Your financial snapshot at a glance
        </p>
      </div>
      <DashboardGrid />
    </PageWrapper>
  )
}
