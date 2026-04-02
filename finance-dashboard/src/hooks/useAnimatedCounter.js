import { useEffect, useRef, useState } from 'react'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * Animates a number from 0 (or previous value) to `target` over `duration` ms.
 * @param {number} target
 * @param {number} duration - ms (default 1200)
 * @returns {number} current animated value
 */
export function useAnimatedCounter(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const startRef = useRef(null)
  const rafRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    fromRef.current = value
    startRef.current = null

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutExpo(progress)
      setValue(fromRef.current + (target - fromRef.current) * eased)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration])

  return value
}
