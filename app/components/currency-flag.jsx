/** @typedef {import('../constants').CURRENCIES[number]} Currency */

/**
 * @param {{
 *   className?: string
 *   isoCode: Currency
 *   loading?: 'lazy'
 * }} props
 */
export default function CurrencyFlag({ className, isoCode, loading }) {
  return (
    <img
      className={className}
      src={`flags/${isoCode.toLowerCase()}.avif`}
      alt=""
      width={48}
      height={48}
      loading={loading}
    />
  )
}
