const CONFIGS = {
  USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
  INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
}

function getFormatter(currencyCode) {
  const cfg = CONFIGS[currencyCode] ?? CONFIGS.USD
  return new Intl.NumberFormat(cfg.locale, {
    style: 'currency',
    currency: cfg.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Format a number as currency string.
 * @param {number} amount
 * @param {'USD'|'INR'} [currencyCode='USD']
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = 'USD') {
  return getFormatter(currencyCode).format(amount)
}

/**
 * Format with +/− sign prefix based on transaction type.
 * @param {number} amount
 * @param {'income'|'expense'} type
 * @param {'USD'|'INR'} [currencyCode='USD']
 * @returns {string}
 */
export function formatAmount(amount, type, currencyCode = 'USD') {
  const formatted = getFormatter(currencyCode).format(amount)
  return type === 'income' ? `+${formatted}` : `−${formatted}`
}

/**
 * Compact format for large numbers (e.g. $12.4k / ₹1.2L)
 * @param {number} amount
 * @param {'USD'|'INR'} [currencyCode='USD']
 * @returns {string}
 */
export function formatCompact(amount, currencyCode = 'USD') {
  const cfg = CONFIGS[currencyCode] ?? CONFIGS.USD
  const abs = Math.abs(amount)
  const sign = amount < 0 ? '-' : ''

  if (currencyCode === 'INR') {
    if (abs >= 10_000_000) return `${sign}${cfg.symbol}${(abs / 10_000_000).toFixed(1)}Cr`
    if (abs >= 100_000)    return `${sign}${cfg.symbol}${(abs / 100_000).toFixed(1)}L`
    if (abs >= 1_000)      return `${sign}${cfg.symbol}${(abs / 1_000).toFixed(1)}K`
    return formatCurrency(amount, currencyCode)
  }

  if (abs >= 1_000_000) return `${sign}${cfg.symbol}${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000)     return `${sign}${cfg.symbol}${(abs / 1_000).toFixed(1)}k`
  return formatCurrency(amount, currencyCode)
}
