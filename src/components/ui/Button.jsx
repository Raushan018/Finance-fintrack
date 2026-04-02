import { forwardRef } from 'react'

const variants = {
  primary: 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-sm',
  ghost:   'bg-transparent hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  danger:  'bg-[var(--danger)]/10 hover:bg-[var(--danger)]/20 text-[var(--danger)] border border-[var(--danger)]/20',
  outline: 'bg-transparent border border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-white/3',
  subtle:  'bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
}

const sizes = {
  xs: 'px-2 py-1 text-xs rounded-md gap-1',
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-5 py-2.5 text-base rounded-lg gap-2',
}

export const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className = '',
    disabled,
    children,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-150 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-base)]',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        'cursor-pointer select-none',
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
})
