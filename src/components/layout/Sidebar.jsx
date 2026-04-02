import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  Shield, Eye, TrendingUp, Settings,
} from 'lucide-react'
import { useRole } from '../../context/RoleContext'

const navItems = [
  {
    to:    '/',
    label: 'Dashboard',
    Icon:  LayoutDashboard,
    desc:  'Overview & charts',
  },
  {
    to:    '/transactions',
    label: 'Transactions',
    Icon:  ArrowLeftRight,
    desc:  'History & records',
  },
  {
    to:    '/insights',
    label: 'Insights',
    Icon:  Lightbulb,
    desc:  'Smart analysis',
  },
]

export function Sidebar({ onClose, width = 248 }) {
  const { role, isAdmin } = useRole()
  const initials = isAdmin ? 'AD' : 'VW'

  return (
    <aside
      style={{
        width,
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top gradient accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background: 'radial-gradient(ellipse at 50% -30%, rgba(99,102,241,0.12), transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Logo ─────────────────────────────────────── */}
      <div
        style={{
          padding: '18px 18px 16px',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>

          {/* Logo mark — layered glow */}
          <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
            {/* Outer ambient glow */}
            <div style={{
              position: 'absolute',
              inset: -3,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)',
              opacity: 0.35,
              filter: 'blur(6px)',
              zIndex: 0,
            }} />
            {/* Gradient border ring */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 13,
              padding: 1.5,
              background: 'linear-gradient(135deg, #818cf8 0%, #a855f7 50%, #38bdf8 100%)',
              zIndex: 1,
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: 11.5,
                background: 'linear-gradient(145deg, #1e1b4b 0%, #0f172a 60%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TrendingUp size={18} color="white" strokeWidth={2.5} style={{ filter: 'drop-shadow(0 0 4px rgba(129,140,248,0.8))' }} />
              </div>
            </div>
          </div>

          {/* Wordmark */}
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: '-0.6px',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #e0e7ff 0%, #818cf8 45%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Fintrack
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
              <p style={{
                fontSize: 9,
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                Finance OS
              </p>
              <span style={{
                fontSize: 8,
                fontWeight: 800,
                padding: '1.5px 5px',
                borderRadius: 5,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.25))',
                border: '1px solid rgba(129,140,248,0.4)',
                color: '#a5b4fc',
                letterSpacing: '0.08em',
                lineHeight: 1.4,
              }}>
                PRO
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Navigation ──────────────────────────────── */}
      <div style={{ padding: '12px 0 0', position: 'relative', zIndex: 1 }}>
        {/* <p style={{
          fontSize: 10,
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0 20px',
          marginBottom: 6,
        }}>
          Menu
        </p> */}

        <nav style={{ padding: '0 10px' }} aria-label="Main navigation">
          {navItems.map(({ to, label, Icon, desc }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              style={{ display: 'block', textDecoration: 'none', marginBottom: 2 }}
            >
              {({ isActive }) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '9px 12px',
                    borderRadius: 10,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease, transform 0.15s ease',
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(99,102,241,0.14), rgba(99,102,241,0.06))'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(99,102,241,0.18)'
                      : '1px solid transparent',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.transform = 'translateX(2px)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }
                  }}
                >
                  {/* Left accent bar */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      bottom: '20%',
                      width: 3,
                      borderRadius: '0 3px 3px 0',
                      background: 'linear-gradient(180deg, #818cf8, #6366f1)',
                      boxShadow: '0 0 8px rgba(99,102,241,0.5)',
                    }} />
                  )}

                  {/* Icon box */}
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: isActive
                      ? 'rgba(99,102,241,0.18)'
                      : 'rgba(255,255,255,0.04)',
                    border: isActive
                      ? '1px solid rgba(99,102,241,0.3)'
                      : '1px solid transparent',
                    transition: 'background 0.15s ease, border-color 0.15s ease',
                  }}>
                    <Icon
                      size={15}
                      strokeWidth={isActive ? 2.25 : 1.75}
                      color={isActive ? '#818cf8' : 'var(--text-muted)'}
                    />
                  </div>

                  {/* Label + desc */}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      lineHeight: 1.2,
                      transition: 'color 0.15s ease',
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontSize: 10,
                      color: isActive ? 'var(--text-muted)' : 'var(--text-muted)',
                      lineHeight: 1,
                      marginTop: 2,
                      opacity: 0.8,
                    }}>
                      {desc}
                    </p>
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <div style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#6366f1',
                      boxShadow: '0 0 6px rgba(99,102,241,0.8)',
                      flexShrink: 0,
                    }} />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* ── User / Role Footer ───────────────────────── */}
      <div
        style={{
          margin: '0 10px 12px',
          padding: '12px',
          borderRadius: 12,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Avatar */}
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: isAdmin
              ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(99,102,241,0.1))'
              : 'rgba(255,255,255,0.06)',
            border: isAdmin
              ? '1px solid rgba(99,102,241,0.35)'
              : '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: isAdmin ? '#818cf8' : 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}>
              {initials}
            </span>
          </div>

          {/* Role info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              textTransform: 'capitalize',
            }}>
              {role}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              {isAdmin
                ? <Shield size={10} color="#6366f1" strokeWidth={2} />
                : <Eye    size={10} color="var(--text-muted)" strokeWidth={2} />
              }
              <p style={{
                fontSize: 10,
                color: isAdmin ? '#6366f1' : 'var(--text-muted)',
                fontWeight: 500,
              }}>
                {isAdmin ? 'Full access' : 'Read-only'}
              </p>
            </div>
          </div>

          {/* Settings icon */}
          <button
            aria-label="Settings"
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'transparent',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'background 0.15s ease, color 0.15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <Settings size={13} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </aside>
  )
}
