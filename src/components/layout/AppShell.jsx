import { useState, useEffect, useRef, useCallback } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar }  from './TopBar'

const MIN_WIDTH  = 200
const MAX_WIDTH  = 380
const DEFAULT_W  = 248

function getSavedWidth() {
  try {
    const v = localStorage.getItem('fd_sidebar_width')
    const n = parseInt(v, 10)
    return n >= MIN_WIDTH && n <= MAX_WIDTH ? n : DEFAULT_W
  } catch { return DEFAULT_W }
}

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(getSavedWidth)
  const [isDragging, setIsDragging]     = useState(false)
  const dragStartX   = useRef(0)
  const dragStartW   = useRef(0)
  const location     = useLocation()

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  /* ── Persist width ─────────────────────────────── */
  useEffect(() => {
    try { localStorage.setItem('fd_sidebar_width', sidebarWidth) } catch {}
  }, [sidebarWidth])

  /* ── Drag handlers ─────────────────────────────── */
  const onDragStart = useCallback((e) => {
    e.preventDefault()
    dragStartX.current = e.clientX
    dragStartW.current = sidebarWidth
    setIsDragging(true)
  }, [sidebarWidth])

  useEffect(() => {
    if (!isDragging) return

    const onMove = (e) => {
      const delta = e.clientX - dragStartX.current
      const next  = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, dragStartW.current + delta))
      setSidebarWidth(next)
    }

    const onUp = () => setIsDragging(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [isDragging])

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-base)',
        userSelect: isDragging ? 'none' : 'auto',
        cursor:    isDragging ? 'col-resize' : 'auto',
      }}
    >
      {/* Desktop sidebar */}
      <div className="hidden lg:flex" style={{ width: sidebarWidth, flexShrink: 0, position: 'relative' }}>
        <Sidebar width={sidebarWidth} />

        {/* ── Drag handle ──────────────────────────── */}
        <div
          onMouseDown={onDragStart}
          title="Drag to resize"
          style={{
            position:  'absolute',
            top:       0,
            right:     -3,
            bottom:    0,
            width:     6,
            zIndex:    20,
            cursor:    'col-resize',
            display:   'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Visible indicator line */}
          <div
            style={{
              width:      2,
              height:     '100%',
              borderRadius: 2,
              background:   isDragging
                ? 'var(--accent)'
                : 'transparent',
              transition:   isDragging ? 'none' : 'background 0.2s ease',
            }}
            className="group-drag-line"
          />
          {/* Hover glow — shown via parent hover since we can't use CSS :hover on inline styles easily */}
          <style>{`
            div[title="Drag to resize"]:hover > div {
              background: var(--accent) !important;
              opacity: 0.5;
            }
            div[title="Drag to resize"]:hover {
              background: linear-gradient(90deg, transparent, rgba(99,102,241,0.06));
            }
          `}</style>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 animate-slide-down">
            <Sidebar onClose={() => setMobileOpen(false)} width={DEFAULT_W} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--bg-base)' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
