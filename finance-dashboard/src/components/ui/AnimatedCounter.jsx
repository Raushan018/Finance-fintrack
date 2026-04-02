import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'
import { useCurrency } from '../../context/CurrencyContext'

export function AnimatedCounter({ value, duration = 1200, className = '' }) {
  const animated = useAnimatedCounter(value, duration)
  const { format } = useCurrency()
  return (
    <span className={className}>
      {format(animated)}
    </span>
  )
}
