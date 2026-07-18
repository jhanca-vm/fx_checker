import clsx from 'clsx/lite'
import { useId } from 'react'

/**
 * @param {{
 *   className?: string
 *   label: string
 *   value: string
 *   disabled?: boolean
 *   children: import('react').ReactNode
 *   onChange: (value: string) => void
 * }} props
 */
export default function Field({
  className,
  label,
  value,
  disabled,
  children,
  onChange
}) {
  const id = useId()

  return (
    <div
      className={clsx(
        'grid grid-cols-[1fr_auto] items-center gap-5 rounded-2xl',
        'bg-neutral-600 p-4 ring ring-neutral-500 sm:p-5'
      )}
    >
      <label
        className={clsx(
          'col-span-2 w-fit text-sm/tight tracking-wider text-neutral-100',
          'uppercase'
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={clsx(
          className,
          'w-full rounded-lg px-1 text-3xl/none font-bold tracking-tight',
          'underline decoration-transparent decoration-1 underline-offset-6',
          'outline-2 outline-offset-2 outline-transparent transition-colors',
          'not-focus:hover:decoration-neutral-200',
          'focus-visible:outline-lime-500 lg:text-5xl'
        )}
        type="number"
        id={id}
        value={value}
        disabled={disabled}
        onChange={event => onChange(event.currentTarget.value)}
      />
      {children}
    </div>
  )
}
