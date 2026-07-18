import clsx from 'clsx/lite'

import IconExchange from '../assets/icons/exchange.svg'
import useRate from '../hooks/use-rate'
import CurrencySelect from './currency-select'
import Field from './field'

export default function Rate() {
  const {
    state,
    isLoading,
    handleAmountChange,
    handleCurrenciesSwap,
    handleIsoCodeChange
  } = useRate()

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
            value={state.base.amount}
            onChange={value => handleAmountChange('base', value)}
          >
            <CurrencySelect
              value={state.base.isoCode}
              onChange={value => handleIsoCodeChange('base', value)}
            />
          </Field>
          <button
            className={clsx(
              'rounded-lg bg-neutral-600 p-3.5 ring ring-neutral-500',
              'outline-1 outline-offset-3 outline-transparent',
              'transition-colors hover:bg-neutral-500',
              'hover:ring-neutral-400 focus-visible:outline-lime-500'
            )}
            type="button"
            onClick={handleCurrenciesSwap}
          >
            <IconExchange className="w-5 md:rotate-90" />
          </button>
          <Field
            className={clsx(
              'text-lime-500',
              isLoading && 'animate-pulse bg-neutral-400'
            )}
            label="Obtengo"
            value={state.quote.amount}
            disabled={isLoading}
            onChange={value => handleAmountChange('quote', value)}
          >
            <CurrencySelect
              value={state.quote.isoCode}
              onChange={value => handleIsoCodeChange('quote', value)}
            />
          </Field>
        </div>
        <div className="border-t border-dashed border-neutral-500 p-4 sm:p-5">
          <p className="text-xs/tight tracking-wide max-sm:text-center">
            1 {state.base.isoCode} ={' '}
            <span
              className={clsx(
                'inline-block h-[1.2em] rounded-sm align-middle',
                isLoading && 'w-16 animate-pulse bg-neutral-500'
              )}
            >
              {state.rate || ''}
            </span>{' '}
            {state.quote.isoCode}
          </p>
        </div>
      </form>
    </section>
  )
}
