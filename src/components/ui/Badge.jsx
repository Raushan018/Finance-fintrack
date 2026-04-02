/**
 * Pill badge. Can be used for category chips or income/expense type labels.
 */
export function Badge({ children, className = '', variant = 'default', ...props }) {
  const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border'

  const variants = {
    default: 'bg-white/5 text-[var(--text-secondary)] border-[var(--border)]',
    income:  'bg-green-500/10 text-green-400 border-green-500/20',
    expense: 'bg-red-500/10 text-red-400 border-red-500/20',
  }

  return (
    <span
      className={[base, variants[variant] ?? variants.default, className].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
