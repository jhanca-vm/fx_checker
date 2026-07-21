import clsx from 'clsx/lite'

/** @param {{ label: string; isActive?: boolean }} props */
export default function Tab({ label, isActive }) {
  return (
    <button
      className={clsx(
        'h-10 rounded-t-sm border-b px-4 leading-tight tracking-wider',
        isActive ? 'border-lime-500' : 'border-transparent',
        'uppercase outline-2 outline-offset-2 outline-transparent',
        'transition-colors focus-visible:outline-lime-500'
      )}
    >
      {label}
    </button>
  )
}
