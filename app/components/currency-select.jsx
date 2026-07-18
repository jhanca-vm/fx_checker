import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import clsx from 'clsx/lite'

import IconCheck from '../assets/icons/check.svg'
import IconChevron from '../assets/icons/chevron.svg'
import { CURRENCIES } from '../constants'
import useCurrencySelect from '../hooks/use-currency-select'
import CurrencyFlag from './currency-flag'

/**
 * @param {{
 *   value: CURRENCIES[number]
 *   onChange: (value: CURRENCIES[number]) => void
 * }} props
 */
export default function CurrencySelect({ value, onChange }) {
  const { floating, interactions, isOpen, listRef, close } = useCurrencySelect()

  return (
    <>
      <button
        ref={floating.refs.setReference}
        className={clsx(
          'flex items-center gap-2 rounded-lg bg-neutral-500 p-2.5 ring',
          'ring-neutral-400 outline-1 outline-offset-3 outline-transparent',
          'transition-colors hover:bg-neutral-400',
          'focus-visible:outline-lime-500'
        )}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        {...interactions.getReferenceProps()}
      >
        <CurrencyFlag className="w-5" isoCode={value} />
        <span className="text-sm/tight tracking-wider">{value}</span>
        <IconChevron className="w-3 fill-current" />
      </button>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={floating.context} modal={false}>
            <nav
              ref={floating.refs.setFloating}
              className={clsx(
                'mt-5 grid max-h-64 scrollbar-thin overflow-auto rounded-l-lg',
                'bg-neutral-600 p-2 ring ring-neutral-400 outline-0 md:mt-2.5'
              )}
              style={floating.floatingStyles}
              {...interactions.getFloatingProps()}
            >
              {CURRENCIES.map((currency, index) => (
                <button
                  ref={node => (listRef.current[index] = node)}
                  className={clsx(
                    'flex items-center gap-3 rounded-sm px-2 py-3 ring',
                    'ring-transparent outline-0 transition-colors',
                    'hover:ring-neutral-200 focus:ring-lime-500'
                  )}
                  type="button"
                  tabIndex={-1}
                  key={currency}
                  {...interactions.getItemProps({
                    onClick() {
                      onChange(currency)
                      close()
                    }
                  })}
                >
                  <CurrencyFlag
                    className="w-5"
                    isoCode={currency}
                    loading="lazy"
                  />
                  <span className="grow text-left">{currency}</span>
                  {currency === value && (
                    <IconCheck className="ml-3 w-3 fill-current" />
                  )}
                </button>
              ))}
            </nav>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
