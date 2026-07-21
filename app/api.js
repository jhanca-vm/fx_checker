import { format } from '@formkit/tempo'

const BASE_URL = 'https://api.frankfurter.dev/v2/'

/** @typedef {import('./constants').CURRENCIES[number]} Currency */

/**
 * @param {Currency} base
 * @param {Currency} quote
 * @returns {Promise<number>}
 */
export async function getRate(base, quote) {
  const { href } = new URL(`rate/${base}/${quote}`, BASE_URL)
  const { rate } = await fetch(href).then(res => res.json())

  return rate
}

/**
 * @param {Currency} base
 * @param {Currency} quote
 * @param {Date} from
 * @param {'week' | 'month'} [group]
 * @returns {Promise<{ date: string; rate: number }[]>}
 */
export async function getHistoricalRates(base, quote, from, group) {
  const url = new URL('rates', BASE_URL)

  url.searchParams.set('base', base)
  url.searchParams.set('quotes', quote)
  url.searchParams.set('from', format(from, 'YYYY-MM-DD'))

  if (group) url.searchParams.set('group', group)

  const rates = await fetch(url).then(res => res.json())

  return rates
}
