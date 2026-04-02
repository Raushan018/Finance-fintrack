import { Shield, Eye, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useRole } from '../../context/RoleContext'

export function RoleSwitcher() {
  const { role, setRole, isAdmin } = useRole()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handle = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const options = [
    { value: 'viewer', label: 'Viewer', Icon: Eye,    desc: 'Read-only access' },
    { value: 'admin',  label: 'Admin',  Icon: Shield, desc: 'Full access'      },
  ]
  const current = options.find(o => o.value === role)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="
          flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
          border border-[var(--border)] bg-[var(--bg-elevated)]
          text-[var(--text-primary)] hover:border-[var(--border-strong)]
          transition-all duration-150 cursor-pointer select-none
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
        "
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={isAdmin ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}>
          <current.Icon size={14} strokeWidth={2} />
        </span>
        <span>{current.label}</span>
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={`text-[var(--text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-full mt-1.5 w-44
            bg-[var(--bg-elevated)] border border-[var(--border)]
            rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]
            overflow-hidden z-50 animate-scale-in
          "
          role="listbox"
        >
          {options.map(({ value, label, Icon, desc }) => (
            <button
              key={value}
              role="option"
              aria-selected={role === value}
              onClick={() => { setRole(value); setOpen(false) }}
              className={[
                'w-full flex items-start gap-3 px-3 py-2.5 text-left transition-colors duration-100 cursor-pointer',
                role === value
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'text-[var(--text-primary)] hover:bg-white/5',
              ].join(' ')}
            >
              <Icon size={15} strokeWidth={2} className="mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-medium leading-tight">{label}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">{desc}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
