import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const [role, setRole] = useLocalStorage('fd_role', 'viewer')

  const isAdmin = role === 'admin'

  return (
    <RoleContext.Provider value={{ role, setRole, isAdmin }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be inside RoleProvider')
  return ctx
}
