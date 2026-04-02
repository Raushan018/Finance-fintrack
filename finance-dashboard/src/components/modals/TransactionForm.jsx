import { useState } from 'react'
import { CATEGORIES } from '../../data/categories'
import { Button } from '../ui/Button'
import { CategoryIcon } from '../ui/CategoryIcon'
import { validateTransaction, isValid } from '../../utils/validators'
import { useCurrency, CURRENCIES } from '../../context/CurrencyContext'

const today = () => new Date().toISOString().split('T')[0]

const FIELD = 'w-full px-3 py-2.5 text-sm rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all duration-150'
const LABEL = 'block text-xs font-medium text-[var(--text-secondary)] mb-1.5'
const ERROR = 'text-xs text-red-400 mt-1'

export function TransactionForm({ initial, onSubmit, onCancel, submitLabel = 'Save' }) {
  const { currency, setCurrency } = useCurrency()
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: today(),
    note: '',
    ...initial,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateTransaction(form)
    if (!isValid(errs)) { setErrors(errs); return }
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Type selector */}
      <div>
        <label className={LABEL}>Type</label>
        <div className="flex gap-2">
          {['income', 'expense'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setForm(f => ({ ...f, type: t }))}
              className={[
                'flex-1 py-2 text-sm font-medium rounded-lg border transition-all duration-150 cursor-pointer',
                form.type === t
                  ? t === 'income'
                    ? 'bg-green-500/15 text-green-400 border-green-500/30'
                    : 'bg-red-500/15 text-red-400 border-red-500/30'
                  : 'bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:bg-white/5',
              ].join(' ')}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        {errors.type && <p className={ERROR}>{errors.type}</p>}
      </div>

      {/* Currency selector */}
      <div>
        <label className={LABEL}>Currency</label>
        <div className="flex gap-2">
          {CURRENCIES.map(({ code, symbol, flag, name }) => {
            const active = currency === code
            return (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={[
                  'flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg border transition-all duration-150 cursor-pointer',
                  active
                    ? 'bg-(--accent)/15 text-(--accent) border-(--accent)/40'
                    : 'bg-transparent text-(--text-muted) border-(--border) hover:bg-white/5',
                ].join(' ')}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>{flag}</span>
                <span>{symbol} {code}</span>
                {active && <span className="text-[10px] opacity-60">({name})</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={LABEL} htmlFor="desc">Description</label>
        <input
          id="desc"
          type="text"
          value={form.description}
          onChange={set('description')}
          placeholder="e.g. Monthly Salary"
          className={[FIELD, errors.description ? 'border-red-500/50' : ''].join(' ')}
        />
        {errors.description && <p className={ERROR}>{errors.description}</p>}
      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL} htmlFor="amount">Amount ({currency})</label>
          <input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={set('amount')}
            placeholder="0.00"
            className={[FIELD, errors.amount ? 'border-red-500/50' : ''].join(' ')}
          />
          {errors.amount && <p className={ERROR}>{errors.amount}</p>}
        </div>
        <div>
          <label className={LABEL} htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={set('date')}
            className={[FIELD, errors.date ? 'border-red-500/50' : ''].join(' ')}
            style={{ colorScheme: 'dark' }}
          />
          {errors.date && <p className={ERROR}>{errors.date}</p>}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className={LABEL}>Category</label>
        <div className="grid grid-cols-5 gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              type="button"
              title={cat.label}
              onClick={() => setForm(f => ({ ...f, category: cat.slug }))}
              className={[
                'flex flex-col items-center gap-1 py-2 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer',
                form.category === cat.slug
                  ? `${cat.bgColor} ${cat.textColor}`
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:bg-white/5',
              ].join(' ')}
              style={{
                borderColor: form.category === cat.slug ? cat.color + '50' : undefined,
              }}
            >
              <CategoryIcon name={cat.icon} size={13} />
              <span className="truncate w-full text-center text-[10px]">{cat.label}</span>
            </button>
          ))}
        </div>
        {errors.category && <p className={ERROR}>{errors.category}</p>}
      </div>

      {/* Note (optional) */}
      <div>
        <label className={LABEL} htmlFor="note">
          Note <span className="text-[var(--text-muted)] font-normal">(optional)</span>
        </label>
        <input
          id="note"
          type="text"
          value={form.note}
          onChange={set('note')}
          placeholder="Add a note…"
          className={FIELD}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button type="button" variant="outline" size="md" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="md" className="flex-1" disabled={loading}>
          {loading ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
