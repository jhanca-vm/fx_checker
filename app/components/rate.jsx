import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx/lite'
import { useEffect, useEffectEvent } from 'react'

import { getRate } from '../api'
import IconExchange from '../assets/icons/exchange.svg'
import useRate from '../hooks/use-rate'
import CurrencySelect from './currency-select'
import Field from './field'

export default function Rate() {
  const baseCurrency = useRate(state => state.baseCurrency)
  const baseAmount = useRate(state => state.baseAmount)
  const quoteCurrency = useRate(state => state.quoteCurrency)
  const quoteAmount = useRate(state => state.quoteAmount)
  const setAmount = useRate(state => state.setAmount)
  const setCurrency = useRate(state => state.setCurrency)
  const swapCurrencies = useRate(state => state.swapCurrencies)

  const { data, isLoading } = useQuery({
    queryKey: ['rate', baseCurrency, quoteCurrency],
    queryFn: () => getRate(baseCurrency, quoteCurrency)
  })

  const onSuccess = useEffectEvent(data => {
    if (data) setAmount('quote', (Number(baseAmount) * data).toFixed(2))
  })

  useEffect(() => onSuccess(data), [data])

  return (
    <section>
      <h1 className="mb-4 text-xl/none tracking-tight uppercase">
        Consulta la tasa de cambio
      </h1>
      <form className="rounded-3xl bg-neutral-700 shadow-lg">
        <div
          className={
            'flex items-center gap-4 p-4 max-md:flex-col sm:p-5 md:gap-6'
          }
        >
          <Field
            label="De"
            value={baseAmount}
            onChange={value => setAmount('base', value, data)}
          >
            <CurrencySelect
              value={baseCurrency}
              onChange={value => setCurrency('base', value)}
            />
          </Field>
          <button
            className={clsx(
              'rounded-lg bg-neutral-600 p-3.5 ring ring-neutral-500',
              'outline-1 outline-offset-3 outline-transparent',
              'transition-colors ring-inset hover:bg-neutral-500',
              'hover:ring-neutral-400 focus-visible:outline-lime-500'
            )}
            type="button"
            onClick={swapCurrencies}
          >
            <IconExchange className="w-5 md:rotate-90" />
          </button>
          <Field
            className={clsx(
              'text-lime-500',
              isLoading && 'animate-pulse bg-neutral-400'
            )}
            label="Obtengo"
            value={quoteAmount}
            disabled={isLoading}
            onChange={value => setAmount('quote', value, data)}
          >
            <CurrencySelect
              value={quoteCurrency}
              onChange={value => setCurrency('quote', value)}
            />
          </Field>
        </div>
        <div className="border-t-2 border-dashed border-neutral-500 p-4 sm:p-5">
          <p className="text-xs/tight tracking-wide max-sm:text-center">
            1 {baseCurrency} ={' '}
            <span
              className={clsx(
                'inline-block h-[1.2em] rounded-sm align-middle',
                isLoading && 'w-16 animate-pulse bg-neutral-500'
              )}
            >
              {data || ''}
            </span>{' '}
            {quoteCurrency}
          </p>
        </div>
      </form>
    </section>
  )
}
