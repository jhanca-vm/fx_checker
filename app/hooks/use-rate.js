import { create } from 'zustand'

import { parse } from '../utils/currency'

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

      switch (side) {
        case 'base':
          return { baseAmount: amount, quoteAmount: parse(amount * rate) }
        case 'quote':
          return { baseAmount: parse(amount / rate), quoteAmount: amount }
      }
    })
  },
  setCurrency(side, currency) {
    set({ [`${side}Currency`]: currency, quoteAmount: '' })
  },
  swapCurrencies() {
    set(state => ({
      baseCurrency: state.quoteCurrency,
      baseAmount: parse(state.quoteAmount),
      quoteCurrency: state.baseCurrency,
      quoteAmount: ''
    }))
  }
}))

export default useRate
