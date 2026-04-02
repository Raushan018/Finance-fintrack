import { ThemeProvider }    from './ThemeContext'
import { RoleProvider }     from './RoleContext'
import { CurrencyProvider } from './CurrencyContext'
import { TransactionProvider } from './TransactionContext'
import { FilterProvider }   from './FilterContext'

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <RoleProvider>
        <CurrencyProvider>
          <TransactionProvider>
            <FilterProvider>
              {children}
            </FilterProvider>
          </TransactionProvider>
        </CurrencyProvider>
      </RoleProvider>
    </ThemeProvider>
  )
}
