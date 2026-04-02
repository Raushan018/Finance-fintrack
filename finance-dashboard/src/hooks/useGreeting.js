/**
 * Returns a time-aware greeting string and period.
 */
export function useGreeting() {
  const hour = new Date().getHours()

  let greeting, period
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning'
    period = 'morning'
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon'
    period = 'afternoon'
  } else if (hour >= 17 && hour < 22) {
    greeting = 'Good evening'
    period = 'evening'
  } else {
    greeting = 'Good night'
    period = 'night'
  }

  return { greeting, period }
}
