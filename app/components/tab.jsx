import clsx from 'clsx/lite'

/**
 * @param {{
 *   label: string
 *   isActive?: boolean
 *   onClick: () => void
 * }} props
 */
export default function Tab({ label, isActive, onClick }) {
  return (
    <button
      className={clsx(
        isActive
          ? 'border-lime-500'
          : 'border-transparent hover:border-neutral-300',
        'h-10 rounded-t-sm border-b px-4 leading-tight tracking-wider',
        'uppercase outline-2 outline-offset-2 outline-transparent',
        'transition-colors focus-visible:outline-lime-500'
      )}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
