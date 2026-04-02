import { CATEGORIES } from '../data/categories'

export function getCategory(slug) {
  return CATEGORIES.find(c => c.slug === slug)
}

export function getCategoryColor(slug) {
  return getCategory(slug)?.color ?? '#6b7280'
}

export function getCategoryLabel(slug) {
  return getCategory(slug)?.label ?? slug
}

export function getCategoryIcon(slug) {
  return getCategory(slug)?.icon ?? 'Circle'
}

export function getCategoryBgColor(slug) {
  return getCategory(slug)?.bgColor ?? 'bg-gray-500/10'
}

export function getCategoryTextColor(slug) {
  return getCategory(slug)?.textColor ?? 'text-gray-400'
}

export function getCategoryBorderColor(slug) {
  return getCategory(slug)?.borderColor ?? 'border-gray-500/20'
}

/** Return all expense category slugs */
export function getExpenseCategories() {
  return CATEGORIES.filter(c => c.type === 'expense')
}

/** Return all income category slugs */
export function getIncomeCategories() {
  return CATEGORIES.filter(c => c.type === 'income')
}
