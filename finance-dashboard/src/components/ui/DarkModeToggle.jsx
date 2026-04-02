import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="
        w-8 h-8 rounded-lg flex items-center justify-center
        text-[var(--text-secondary)] hover:text-[var(--text-primary)]
        hover:bg-white/5 transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
        cursor-pointer
      "
    >
      <span className="transition-all duration-300">
        {isDark ? <Sun size={16} strokeWidth={1.75} /> : <Moon size={16} strokeWidth={1.75} />}
      </span>
    </button>
  )
}
