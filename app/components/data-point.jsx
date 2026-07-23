import clsx from 'clsx/lite'

/**
 * @param {{
 *   className?: string
 *   title: string
 *   value?: string
 *   isLoading: boolean
 * }} props
 */
export default function DataPoint({ className, title, value, isLoading }) {
  return (
    <div
      className={clsx(
        'rounded-2xl bg-neutral-700 px-5 py-3 ring ring-neutral-600',
        'ring-inset sm:min-w-35'
      )}
    >
      <dt className="text-sm/tight tracking-wider uppercase opacity-70">
        {title}
      </dt>
      <dd
        className={clsx(
          className,
          'mt-4 h-[1.2em] rounded-sm text-xl/tight tracking-tight',
          isLoading && 'animate-pulse bg-neutral-500'
        )}
      >
        {value}
      </dd>
    </div>
  )
}
