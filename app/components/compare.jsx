import clsx from 'clsx/lite'
import { useId } from 'react'

import useCompare from '../hooks/use-compare'
import { names } from '../utils/currency'
import CurrencyFlag from './currency-flag'

export default function Compare() {
  const id = useId()
  const { amount, currency, length, data, isLoading, formatCurrency } =
    useCompare()

  return (
    <div
      className={clsx(
        'rounded-2xl bg-neutral-700 p-4 ring ring-neutral-600 ring-inset',
        'sm:p-5'
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-2.5">
        <h3 className="tracking-wider">
          <span className="text-sm/tight text-neutral-200 uppercase">
            Cambio de
          </span>{' '}
          <span className="leading-tight font-medium">
            {String(amount).replace('.', ',') || 0} {currency}
          </span>
        </h3>
        <p className="text-xs/tight tracking-wide uppercase opacity-70">
          {length} pares
        </p>
      </header>
      <ul className="mt-4 grid gap-3 sm:mt-5">
        {isLoading
          ? Array.from({ length }, (_, index) => (
              <li
                className={
                  'h-15 animate-pulse rounded-[0.625rem] bg-neutral-500'
                }
                key={`${id}-${index}`}
              />
            ))
          : data.map(({ quote, rate }) => (
              <li
                className={clsx(
                  'flex min-h-15 flex-wrap items-center justify-between',
                  'gap-x-5 gap-y-2.5 rounded-[0.625rem] bg-neutral-600 px-3',
                  'py-2.5 ring ring-neutral-500 ring-inset sm:px-4'
                )}
                key={quote}
              >
                <div className="flex items-center gap-2.5 sm:gap-5">
                  <CurrencyFlag
                    className="w-6"
                    isoCode={quote}
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm/tight tracking-wider">
                      {quote}
                    </span>
                    <span
                      className={clsx(
                        'text-xs/tight tracking-wide text-neutral-200',
                        'capitalize'
                      )}
                    >
                      {names.of(quote)}
                    </span>
                  </div>
                </div>
                <span className="grow text-right leading-tight tracking-wider">
                  {formatCurrency(amount * rate, quote)}
                </span>
              </li>
            ))}
      </ul>
    </div>
  )
}
