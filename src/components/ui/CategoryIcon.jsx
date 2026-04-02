import {
  Briefcase, Code2, TrendingUp, Utensils, Car, Home,
  Monitor, Heart, BookOpen, Circle,
} from 'lucide-react'

const iconMap = {
  Briefcase, Code2, TrendingUp, Utensils, Car, Home,
  Monitor, Heart, BookOpen, Circle,
}

/**
 * Renders the appropriate Lucide icon for a given Lucide icon name.
 */
export function CategoryIcon({ name, size = 16, className = '' }) {
  const Icon = iconMap[name] ?? Circle
  return <Icon size={size} className={className} strokeWidth={1.75} />
}
