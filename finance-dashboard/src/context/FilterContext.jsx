import { createContext, useContext, useState } from 'react'

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const resetFilters = () => {
    setSearchTerm('')
    setTypeFilter('all')
    setSortField('date')
    setSortDirection('desc')
  }

  return (
    <FilterContext.Provider
      value={{
        searchTerm, setSearchTerm,
        typeFilter, setTypeFilter,
        sortField, sortDirection,
        toggleSort, resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be inside FilterProvider')
  return ctx
}
