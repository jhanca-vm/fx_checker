import { useQuery } from '@tanstack/react-query'
import { useEffect, useEffectEvent, useReducer } from 'react'

import { getRate } from '../api'

/**
 * @typedef {import('../constants').CURRENCIES[number]} Currency
 *
 * @typedef {{ isoCode: Currency; amount: string }} Money
 */

/**
 * @param {{ base: Money; quote: Money; rate: number }} state
 * @param {{
 *   type:
 *     | 'rate_changed'
 *     | 'amount_changed'
 *     | 'currencies_swapped'
 *     | 'iso_code_changed'
 *   source: 'base' | 'quote'
 *   payload: string | number
 * }} action
 */
function reducer(state, action) {
  const newState = structuredClone(state)

  if (action.type === 'rate_changed') {
    newState.rate = action.payload
  }

  if (action.type === 'amount_changed') {
    newState[action.source].amount = action.payload

    if (state.rate) {
      const payload = Number(action.payload) || 0

      switch (action.source) {
        case 'base':
          newState.quote.amount = (payload * state.rate).toFixed(2)
          break
        case 'quote':
          newState.base.amount = (payload / state.rate).toFixed(2)
      }
    }
  }

  if (action.type === 'currencies_swapped') {
    newState.rate = 0
    newState.base.amount = state.quote.amount
    newState.base.isoCode = state.quote.isoCode
    newState.quote.amount = ''
    newState.quote.isoCode = state.base.isoCode
  }

  if (action.type === 'iso_code_changed') {
    newState.rate = 0
    newState[action.source].isoCode = action.payload
    newState.quote.amount = ''
  }

  return newState
}

export default function useRate() {
  const [state, dispatch] = useReducer(reducer, {
    base: { isoCode: 'USD', amount: '1.00' },
    quote: { isoCode: 'COP', amount: '' },
    rate: 0
  })

  const { data: rate, isLoading } = useQuery({
    queryKey: ['rate', state.base.isoCode, state.quote.isoCode],
    queryFn: () => getRate(state.base.isoCode, state.quote.isoCode)
  })

  const onSuccess = useEffectEvent(rate => {
    if (rate) {
      dispatch({
        type: 'amount_changed',
        source: 'quote',
        payload: (Number(state.base.amount) * rate).toFixed(2)
      })

      dispatch({ type: 'rate_changed', payload: rate })
    }
  })

  /**
   * @param {'base' | 'quote'} source
   * @param {string} value
   */
  function handleAmountChange(source, value) {
    dispatch({ type: 'amount_changed', source, payload: value })
  }

  function handleCurrenciesSwap() {
    dispatch({ type: 'currencies_swapped' })
  }

  /**
   * @param {'base' | 'quote'} source
   * @param {Currency} value
   */
  function handleIsoCodeChange(source, value) {
    dispatch({ type: 'iso_code_changed', source, payload: value })
  }

  useEffect(() => onSuccess(rate), [rate])

  return {
    state,
    isLoading,
    handleAmountChange,
    handleCurrenciesSwap,
    handleIsoCodeChange
  }
}
