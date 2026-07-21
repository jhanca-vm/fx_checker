import { addDay, addMonth, addYear, date } from '@formkit/tempo'
import { useQuery } from '@tanstack/react-query'
import { useReducer } from 'react'

import { getHistoricalRates } from '../api'
import useRate from './use-rate'

/**
 * @param {{
 *   timeframe: string
 *   date: Date
 *   group: 'week' | 'month' | null
 * }} state
 * @param {{ type: 'changed_timeframe'; timeframe: string }} action
 */
function reducer(state, action) {
  if (action.type === 'changed_timeframe') {
    switch (action.timeframe) {
      case '7D':
        return { timeframe: '7D', date: addDay(new Date(), -7), group: null }
      case '1M':
        return { timeframe: '1M', date: addMonth(new Date(), -1), group: null }
      case '3M':
        return {
          timeframe: '3M',
          date: addMonth(new Date(), -3),
          group: 'week'
        }
      case '1A':
        return {
          timeframe: '1A',
          date: addYear(new Date(), -1),
          group: 'month'
        }
      case '5A':
        return {
          timeframe: '5A',
          date: addYear(new Date(), -5),
          group: 'month'
        }
    }
  }
}

export default function useHistory() {
  const baseCurrency = useRate(state => state.baseCurrency)
  const quoteCurrency = useRate(state => state.quoteCurrency)

  const [state, dispatch] = useReducer(reducer, {
    timeframe: '1M',
    date: addMonth(new Date(), -1),
    group: null
  })

  const { data, isLoading } = useQuery({
    queryKey: ['history', baseCurrency, quoteCurrency, state.date, state.group],
    queryFn: () => {
      return getHistoricalRates(
        baseCurrency,
        quoteCurrency,
        state.date,
        state.group
      )
    }
  })

  console.log(data?.length)
  const open = data?.at(0).rate
  const last = data?.at(-1).rate
  const change = last - open
  const isPositive = change > 0

  /** @param {string} timeframe */
  function setTimeframe(timeframe) {
    dispatch({ type: 'changed_timeframe', timeframe })
  }

  return {
    timeframe: state.timeframe,
    data,
    open,
    last,
    change,
    isPositive,
    isLoading,
    setTimeframe
  }
}
