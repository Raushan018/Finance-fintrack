/**
 * Format a YYYY-MM-DD string as a short date: "Mar 15"
 */
export function formatDateShort(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * Format a YYYY-MM-DD string as a long date: "March 15, 2026"
 */
export function formatDateLong(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

/**
 * Format a YYYY-MM-DD string as "Mar 2026"
 */
export function formatMonthYear(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Get YYYY-MM from a date string for grouping
 */
export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7)
}

/**
 * Get display label for a YYYY-MM key: "Mar 2026"
 */
export function monthKeyToLabel(key) {
  const [year, month] = key.split('-')
  const d = new Date(Number(year), Number(month) - 1, 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Return current YYYY-MM key
 */
export function currentMonthKey() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

/**
 * Return previous YYYY-MM key
 */
export function prevMonthKey() {
  const now = new Date()
  now.setMonth(now.getMonth() - 1)
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}
