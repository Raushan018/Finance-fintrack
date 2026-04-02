/**
 * Validate the add/edit transaction form fields.
 * Returns an object with field-level error messages (empty = valid).
 */
export function validateTransaction({ description, amount, category, date, type }) {
  const errors = {}

  if (!description || !description.trim()) {
    errors.description = 'Description is required'
  } else if (description.trim().length > 80) {
    errors.description = 'Max 80 characters'
  }

  const amt = parseFloat(amount)
  if (!amount && amount !== 0) {
    errors.amount = 'Amount is required'
  } else if (isNaN(amt) || amt <= 0) {
    errors.amount = 'Must be a positive number'
  } else if (amt > 10_000_000) {
    errors.amount = 'Amount too large'
  }

  if (!category) {
    errors.category = 'Please select a category'
  }

  if (!date) {
    errors.date = 'Date is required'
  }

  if (!type || !['income', 'expense'].includes(type)) {
    errors.type = 'Please select a type'
  }

  return errors
}

export function isValid(errors) {
  return Object.keys(errors).length === 0
}
