import clsx from 'clsx/lite'

/**
 * @param {{
 *   value: string
 *   isActive: boolean
 *   onClick: (value: string) => void
 * }} props
 */
export default function Timeframe({ value, isActive, onClick }) {
  return (
    <button
      className={clsx(
        isActive && 'bg-neutral-500',
        'rounded-xl px-4 py-3 ring ring-transparent outline-1 outline-offset-3',
        'outline-transparent transition-colors ring-inset',
        'hover:ring-neutral-500 focus-visible:outline-lime-500'
      )}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  )
}
