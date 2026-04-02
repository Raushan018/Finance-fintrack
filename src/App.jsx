import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProviders } from './context/AppProviders'
import { AppShell } from './components/layout/AppShell'
import { DashboardPage }    from './pages/DashboardPage'
import { TransactionsPage } from './pages/TransactionsPage'
import { InsightsPage }     from './pages/InsightsPage'

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index               element={<DashboardPage />}    />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="insights"     element={<InsightsPage />}     />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}
