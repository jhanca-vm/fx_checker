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
