import { useState, useEffect } from 'react'

/**
 * A useState wrapper that syncs with localStorage.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default if nothing in storage
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Ignore write errors (e.g. private browsing quota)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
