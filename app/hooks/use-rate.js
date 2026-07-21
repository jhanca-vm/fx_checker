import { create } from 'zustand'

/** @typedef {import('../constants').CURRENCIES[number]} Currency */

/** @typedef {'base' | 'quote'} Side */

/**
 * @typedef {import('zustand').StoreApi<{
 *   baseCurrency: Currency
 *   baseAmount: string
 *   quoteCurrency: Currency
 *   quoteAmount: string
 *   setCurrency: (side: Side, currency: Currency) => void
 *   setAmount: (side: Side, amount: string, rate?: number) => void
 *   swapCurrencies: () => void
 * }>} State
 */

/** @type {import('zustand').UseBoundStore<State>} */
const useRate = create(set => ({
  baseCurrency: 'USD',
  baseAmount: '1.00',
  quoteCurrency: 'COP',
  quoteAmount: '',
  setAmount(side, amount, rate) {
    set(() => {
      if (!rate) return { [`${side}Amount`]: amount }

      const amountAsNumber = Number(amount) || 0

      switch (side) {
        case 'base':
          return {
            baseAmount: amount,
            quoteAmount: (amountAsNumber * rate).toFixed(2)
          }
        case 'quote':
          return {
            baseAmount: (amountAsNumber / rate).toFixed(2),
            quoteAmount: amount
          }
      }
    })
  },
  setCurrency(side, currency) {
    set({ [`${side}Currency`]: currency, quoteAmount: '' })
  },
  swapCurrencies() {
    set(state => ({
      baseCurrency: state.quoteCurrency,
      baseAmount: state.quoteAmount,
      quoteCurrency: state.baseCurrency,
      quoteAmount: ''
    }))
  }
}))

export default useRate
