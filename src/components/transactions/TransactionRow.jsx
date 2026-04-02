import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { CategoryIcon } from '../ui/CategoryIcon'
import { formatDateShort } from '../../utils/formatDate'
import { getCategoryIcon, getCategoryLabel, getCategoryBgColor, getCategoryTextColor, getCategoryColor } from '../../utils/categoryHelpers'
import { useRole } from '../../context/RoleContext'
import { useCurrency } from '../../context/CurrencyContext'

export function TransactionRow({ tx, onEdit, onDelete }) {
  const { isAdmin } = useRole()
  const { formatAmt } = useCurrency()
  const icon     = getCategoryIcon(tx.category)
  const label    = getCategoryLabel(tx.category)
  const bgColor  = getCategoryBgColor(tx.category)
  const textColor = getCategoryTextColor(tx.category)
  const catColor = getCategoryColor(tx.category)

  return (
    <tr className="group border-b border-(--border) last:border-0 hover:bg-white/2 transition-colors duration-100 relative">
      {/* Left accent bar on hover */}
      <td className="relative w-0 p-0">
        <span
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ backgroundColor: catColor }}
        />
      </td>

      {/* Date */}
      <td className="px-4 py-3.5 text-sm text-(--text-secondary) whitespace-nowrap">
        {formatDateShort(tx.date)}
      </td>

      {/* Description + note */}
      <td className="px-4 py-3.5 max-w-50">
        <p className="text-sm font-medium text-(--text-primary) truncate">
          {tx.description}
        </p>
        {tx.note && (
          <p className="text-xs text-(--text-muted) truncate mt-0.5">
            {tx.note}
          </p>
        )}
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${bgColor} ${textColor}`}
          style={{ borderColor: catColor + '33' }}
        >
          <CategoryIcon name={icon} size={11} />
          {label}
        </span>
      </td>

      {/* Type */}
      <td className="px-4 py-3.5">
        <Badge variant={tx.type}>{tx.type === 'income' ? 'Income' : 'Expense'}</Badge>
      </td>

      {/* Amount */}
      <td className="px-4 py-3.5 text-sm font-semibold tabular-nums text-right whitespace-nowrap">
        <span className={tx.type === 'income' ? 'text-green-400' : 'text-red-400'}>
          {formatAmt(tx.amount, tx.type)}
        </span>
      </td>

      {/* Admin actions */}
      <td className="px-4 py-3.5 text-right w-20">
        {isAdmin && (
          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={() => onEdit(tx)}
              aria-label="Edit"
              className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--accent) hover:bg-(--accent)/10 transition-all duration-100 cursor-pointer"
            >
              <Pencil size={13} strokeWidth={2} />
            </button>
            <button
              onClick={() => onDelete(tx.id)}
              aria-label="Delete"
              className="p-1.5 rounded-lg text-(--text-muted) hover:text-red-400 hover:bg-red-500/10 transition-all duration-100 cursor-pointer"
            >
              <Trash2 size={13} strokeWidth={2} />
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}
