import { PageWrapper }   from '../components/layout/PageWrapper'
import { InsightsPanel } from '../components/insights/InsightsPanel'

export function InsightsPage() {
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
          Insights
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">
          Smart analysis of your financial patterns
        </p>
      </div>
      <InsightsPanel />
    </PageWrapper>
  )
}
