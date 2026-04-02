import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Menu, Bell, ChevronDown,
  Shield, Eye, LogOut, Settings,
  LayoutDashboard, ArrowLeftRight, Lightbulb,
} from 'lucide-react'
import { DarkModeToggle } from '../ui/DarkModeToggle'
import { useRole }        from '../../context/RoleContext'
import { useGreeting }    from '../../hooks/useGreeting'

/* ── Route meta ──────────────────────────────────────────────── */
const ROUTE_META = {
  '/':              { label: 'Dashboard',    Icon: LayoutDashboard, sub: 'Overview & charts'       },
  '/transactions':  { label: 'Transactions', Icon: ArrowLeftRight,  sub: 'History & records'       },
  '/insights':      { label: 'Insights',     Icon: Lightbulb,       sub: 'Smart financial analysis' },
}

/* ── Live clock ──────────────────────────────────────────────── */
function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}
function formatDate(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

/* ── Notification bell ───────────────────────────────────────── */
function NotificationBell() {
  const [seen, setSeen] = useState(false)
  return (
    <button
      onClick={() => setSeen(true)}
      aria-label="Notifications"
      style={{
        position: 'relative',
        width: 34,
        height: 34,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background    = 'var(--bg-elevated)'
        e.currentTarget.style.color         = 'var(--text-primary)'
        e.currentTarget.style.borderColor   = 'var(--border-strong)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background    = 'transparent'
        e.currentTarget.style.color         = 'var(--text-secondary)'
        e.currentTarget.style.borderColor   = 'var(--border)'
      }}
    >
      <Bell size={15} strokeWidth={1.75} />
      {!seen && (
        <span style={{
          position: 'absolute',
          top: 6, right: 6,
          width: 7, height: 7,
          borderRadius: '50%',
          background: '#6366f1',
          border: '1.5px solid var(--bg-surface)',
          boxShadow: '0 0 6px rgba(99,102,241,0.7)',
        }} />
      )}
    </button>
  )
}

/* ── User / Role dropdown ────────────────────────────────────── */
function UserMenu() {
  const { role, setRole, isAdmin } = useRole()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const initials = isAdmin ? 'AD' : 'VW'

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display:      'flex',
          alignItems:   'center',
          gap:          8,
          padding:      '5px 10px 5px 5px',
          borderRadius: 10,
          border:       '1px solid var(--border)',
          background:   'var(--bg-elevated)',
          cursor:       'pointer',
          transition:   'border-color 0.15s, background 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--border-strong)'
          e.currentTarget.style.background  = 'var(--bg-elevated)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.background  = 'var(--bg-elevated)'
        }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* Avatar */}
        <div style={{
          width:          30,
          height:         30,
          borderRadius:   8,
          background:     isAdmin
            ? 'linear-gradient(135deg, #6366f1, #818cf8)'
            : 'linear-gradient(135deg, rgba(148,163,184,0.3), rgba(100,116,139,0.2))',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexShrink:     0,
          boxShadow:      isAdmin ? '0 2px 8px rgba(99,102,241,0.35)' : 'none',
        }}>
          <span style={{
            fontSize:    10,
            fontWeight:  700,
            color:       'white',
            letterSpacing: '0.03em',
          }}>
            {initials}
          </span>
        </div>

        {/* Name + role */}
        <div style={{ textAlign: 'left', minWidth: 0 }}>
          <p style={{
            fontSize:    12,
            fontWeight:  600,
            color:       'var(--text-primary)',
            lineHeight:  1.2,
            whiteSpace:  'nowrap',
          }}>
            {isAdmin ? 'Admin User' : 'Viewer User'}
          </p>
          <p style={{
            fontSize:   10,
            color:      isAdmin ? '#818cf8' : 'var(--text-muted)',
            lineHeight: 1,
            marginTop:  2,
            display:    'flex',
            alignItems: 'center',
            gap:        3,
          }}>
            {isAdmin
              ? <Shield size={9} strokeWidth={2.5} />
              : <Eye    size={9} strokeWidth={2} />
            }
            {isAdmin ? 'Full access' : 'Read-only'}
          </p>
        </div>

        <ChevronDown
          size={13}
          strokeWidth={2}
          style={{
            color:     'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          style={{
            position:     'absolute',
            right:        0,
            top:          'calc(100% + 8px)',
            width:        220,
            background:   'var(--bg-elevated)',
            border:       '1px solid var(--border)',
            borderRadius: 14,
            boxShadow:    '0 16px 48px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.15)',
            overflow:     'hidden',
            zIndex:       50,
            animation:    'scaleIn 0.15s ease-out',
          }}
        >
          {/* Profile header */}
          <div style={{
            padding:      '14px 14px 12px',
            borderBottom: '1px solid var(--border)',
            display:      'flex',
            alignItems:   'center',
            gap:          10,
          }}>
            <div style={{
              width:          38,
              height:         38,
              borderRadius:   10,
              background:     isAdmin
                ? 'linear-gradient(135deg, #6366f1, #818cf8)'
                : 'linear-gradient(135deg, rgba(148,163,184,0.3), rgba(100,116,139,0.2))',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
              boxShadow:      isAdmin ? '0 4px 12px rgba(99,102,241,0.4)' : 'none',
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{initials}</span>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {isAdmin ? 'Admin User' : 'Viewer User'}
              </p>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.3 }}>
                finance@dashboard.app
              </p>
            </div>
          </div>

          {/* Role badge row */}
          <div style={{ padding: '10px 14px 8px' }}>
            <p style={{
              fontSize: 9,
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 6,
            }}>
              Current Role
            </p>
            <div style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              padding:      '7px 10px',
              borderRadius: 8,
              background:   isAdmin ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.04)',
              border:       `1px solid ${isAdmin ? 'rgba(99,102,241,0.25)' : 'var(--border)'}`,
            }}>
              {isAdmin
                ? <Shield size={13} color="#6366f1" strokeWidth={2} />
                : <Eye    size={13} color="var(--text-muted)" strokeWidth={1.75} />
              }
              <span style={{
                fontSize:   12,
                fontWeight: 600,
                color:      isAdmin ? '#818cf8' : 'var(--text-secondary)',
                textTransform: 'capitalize',
              }}>
                {role}
              </span>
              <span style={{
                marginLeft:   'auto',
                fontSize:     10,
                color:        isAdmin ? 'rgba(99,102,241,0.7)' : 'var(--text-muted)',
                fontWeight:   500,
              }}>
                {isAdmin ? 'Full access' : 'Read-only'}
              </span>
            </div>
          </div>

          {/* Switch role options */}
          <div style={{ padding: '0 8px 8px' }}>
            <p style={{
              fontSize: 9,
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '4px 6px 6px',
            }}>
              Switch Role
            </p>
            {[
              { value: 'viewer', label: 'Viewer', Icon: Eye,    desc: 'Read-only mode'  },
              { value: 'admin',  label: 'Admin',  Icon: Shield, desc: 'Full edit access' },
            ].map(({ value, label, Icon, desc }) => (
              <button
                key={value}
                onClick={() => { setRole(value); setOpen(false) }}
                style={{
                  width:        '100%',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          10,
                  padding:      '8px 8px',
                  borderRadius: 8,
                  border:       'none',
                  background:   role === value ? 'rgba(99,102,241,0.1)' : 'transparent',
                  cursor:       'pointer',
                  textAlign:    'left',
                  transition:   'background 0.12s',
                }}
                onMouseEnter={e => {
                  if (role !== value) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  if (role !== value) e.currentTarget.style.background = 'transparent'
                }}
              >
                <div style={{
                  width:          28,
                  height:         28,
                  borderRadius:   7,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  background:     role === value ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  border:         `1px solid ${role === value ? 'rgba(99,102,241,0.3)' : 'var(--border)'}`,
                  flexShrink:     0,
                }}>
                  <Icon size={13} color={role === value ? '#6366f1' : 'var(--text-muted)'} strokeWidth={role === value ? 2.5 : 1.75} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: role === value ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.2 }}>{label}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.2 }}>{desc}</p>
                </div>
                {role === value && (
                  <div style={{
                    marginLeft:   'auto',
                    width:        6,
                    height:       6,
                    borderRadius: '50%',
                    background:   '#6366f1',
                    boxShadow:    '0 0 6px rgba(99,102,241,0.7)',
                    flexShrink:   0,
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Footer actions */}
          <div style={{ borderTop: '1px solid var(--border)', padding: '8px 8px' }}>
            {[
              { label: 'Settings', Icon: Settings },
              { label: 'Sign out', Icon: LogOut,  danger: true },
            ].map(({ label, Icon, danger }) => (
              <button
                key={label}
                style={{
                  width:        '100%',
                  display:      'flex',
                  alignItems:   'center',
                  gap:          9,
                  padding:      '8px 8px',
                  borderRadius: 8,
                  border:       'none',
                  background:   'transparent',
                  color:        danger ? 'var(--danger)' : 'var(--text-secondary)',
                  cursor:       'pointer',
                  fontSize:     12,
                  fontWeight:   500,
                  textAlign:    'left',
                  transition:   'background 0.12s, color 0.12s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = danger ? 'rgba(239,68,68,0.08)' : 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color      = danger ? 'var(--danger)' : 'var(--text-primary)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color      = danger ? 'var(--danger)' : 'var(--text-secondary)'
                }}
              >
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── TopBar ──────────────────────────────────────────────────── */
export function TopBar({ onMenuClick }) {
  const location   = useLocation()
  const { greeting } = useGreeting()
  const now        = useClock()
  const meta       = ROUTE_META[location.pathname] ?? ROUTE_META['/']

  return (
    <header
      style={{
        position:       'sticky',
        top:            0,
        zIndex:         30,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        gap:            16,
        padding:        '0 20px',
        height:         56,
        background:     'var(--bg-surface)',
        borderBottom:   '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* ── Left: hamburger + page title ─────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        {/* Mobile hamburger */}

        {/* Page icon + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{
            width:          34,
            height:         34,
            borderRadius:   10,
            background:     'rgba(99,102,241,0.1)',
            border:         '1px solid rgba(99,102,241,0.2)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
          }}>
            <meta.Icon size={15} color="#6366f1" strokeWidth={1.75} />
          </div>

          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize:    15,
              fontWeight:  700,
              color:       'var(--text-primary)',
              letterSpacing: '-0.2px',
              lineHeight:  1.2,
              whiteSpace:  'nowrap',
            }}>
              {meta.label}
            </p>
            <p style={{
              fontSize:   11,
              color:      'var(--text-muted)',
              lineHeight: 1,
              marginTop:  2,
              whiteSpace: 'nowrap',
            }}>
              {greeting} · {meta.sub}
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: clock + bell + toggle + user ──────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Live date + time */}
        <div
          style={{
            display:      'flex',
            flexDirection: 'column',
            alignItems:   'flex-end',
            padding:      '4px 10px',
            borderRadius: 10,
            border:       '1px solid var(--border)',
            background:   'var(--bg-elevated)',
            lineHeight:   1,
            gap:          3,
          }}
          className="hidden sm:flex"
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.3px' }}>
            {formatTime(now)}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
            {formatDate(now)}
          </span>
        </div>

        {/* Notification bell */}
        <NotificationBell />

        {/* Dark mode toggle */}
        <DarkModeToggle />

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: 'var(--border)', margin: '0 2px' }} />

        {/* User / role menu */}
        <UserMenu />
      </div>
    </header>
  )
}
