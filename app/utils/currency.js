const numberFormat = new Intl.NumberFormat('en', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false
})

const currencyFormat = new Intl.NumberFormat('es', {
  maximumFractionDigits: 2,
  useGrouping: true
})

export const names = new Intl.DisplayNames('es', { type: 'currency' })

/** @param {number | Intl.StringNumericLiteral} value */
export function parse(value) {
  return numberFormat.format(value)
}

/** @param {number | Intl.StringNumericLiteral} value */
export function format(value) {
  const valueAsNumber = typeof value === 'string' ? Number(value) : value

  if (valueAsNumber && Math.abs(valueAsNumber) < 0.01) {
    const valueAsString = typeof value === 'string' ? value : String(value)
    const isNegative = valueAsNumber < 0

    return (
      (isNegative ? '-' : '') + `0,${valueAsString.slice(isNegative ? 3 : 2)}`
    )
  }

  return currencyFormat.format(valueAsNumber)
}
