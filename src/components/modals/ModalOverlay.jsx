import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export function ModalOverlay({ title, onClose, children }) {
  const overlayRef = useRef(null)
  const panelRef   = useRef(null)

  // Close on Escape
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [onClose])

  // Focus trap: focus first focusable element
  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const focusable = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length) focusable[0].focus()
  }, [])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={panelRef}
        className="
          w-full max-w-md rounded-2xl overflow-hidden animate-scale-in
          border border-[var(--border)]
          shadow-[0_24px_48px_rgba(0,0,0,0.5)]
        "
        style={{ background: 'var(--bg-elevated)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="
              w-7 h-7 flex items-center justify-center rounded-lg
              text-[var(--text-muted)] hover:text-[var(--text-primary)]
              hover:bg-white/5 transition-all duration-150 cursor-pointer
            "
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
