import { useQuery } from '@tanstack/react-query'

import { getRates } from '../api'
import { CURRENCIES } from '../constants'
import useRate from './use-rate'

/** @type {Map<string, Intl.NumberFormat>} */
const formatters = new Map()

export default function useCompare() {
  const baseAmount = useRate(state => state.baseAmount)
  const baseCurrency = useRate(state => state.baseCurrency)
  const quoteCurrency = useRate(state => state.quoteCurrency)

  const quotes = CURRENCIES.filter(
    currency => currency !== baseCurrency && currency !== quoteCurrency
  )

  const { data, isLoading } = useQuery({
    queryKey: ['rates', baseCurrency, quotes],
    queryFn: () => getRates(baseCurrency, quotes)
  })

  /**
   * @param {number} amount
   * @param {CURRENCIES[number]} currency
   */
  function formatCurrency(amount, currency) {
    if (!formatters.has(currency)) {
      formatters.set(
        currency,
        new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: currency,
          currencyDisplay: 'narrowSymbol',
          minimumFractionDigits: 0,
          useGrouping: false
        })
      )
    }

    /** @type {Intl.NumberFormat} */
    const { format } = formatters.get(currency)

    return format(amount)
  }

  return {
    amount: Number(baseAmount),
    currency: baseCurrency,
    length: quotes.length,
    data,
    isLoading,
    formatCurrency
  }
}
