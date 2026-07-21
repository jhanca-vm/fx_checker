import { format } from '@formkit/tempo'
import clsx from 'clsx/lite'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

import useRate from '../hooks/use-rate'

/**
 * @param {{
 *   timeframe: string
 *   data?: [{ date: string; rate: number }]
 *   isLoading: boolean
 * }} props
 */
export default function Chart({ timeframe, data, isLoading }) {
  const baseCurrency = useRate(state => state.baseCurrency)
  const quoteCurrency = useRate(state => state.quoteCurrency)

  return (
    <div
      className={clsx(
        isLoading && 'animate-pulse',
        'w-full rounded-2xl bg-neutral-700 px-3 py-4 ring ring-neutral-600',
        'ring-inset sm:p-5'
      )}
    >
      <header className="flex items-center justify-between">
        <h3 className="leading-tight font-medium tracking-wider">
          {baseCurrency}/{quoteCurrency}
        </h3>
        <time
          className="text-xs/tight tracking-wide uppercase opacity-70"
          datetime={new Date().toISOString()}
        >
          {format(new Date(), 'D MMM, h:mm A')}
        </time>
      </header>
      <AreaChart
        className="mt-5 h-94"
        responsive
        data={data?.map(({ date, rate }) => ({ name: date, rate }))}
      >
        {data && (
          <>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-lime-500)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-lime-500)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              className="stroke-neutral-500"
              strokeDasharray="3 5"
              vertical={false}
            />
            <XAxis
              className="text-xs"
              dataKey="name"
              axisLine={false}
              tick={{ className: 'fill-neutral-200 text-xs/none' }}
              tickFormatter={value => {
                return format(
                  value,
                  timeframe.endsWith('A') ? 'MMM YYYY' : 'D MMM'
                )
              }}
              tickLine={false}
              tickMargin={16}
              interval="preserveStartEnd"
              height="auto"
            />
            <YAxis
              axisLine={false}
              tick={{ className: 'fill-neutral-200 text-xs/none' }}
              tickLine={false}
              tickMargin={16}
              domain={['auto', 'auto']}
              width="auto"
            />
            <Tooltip
              cursor={{
                strokeDasharray: '3 5',
                strokeOpacity: 0.7
              }}
              wrapperClassName={clsx(
                'flex flex-col gap-1 rounded-lg border-neutral-400!',
                'bg-neutral-600! text-xs/none shadow-xl'
              )}
              formatter={value => [`${value} ${quoteCurrency}`]}
              labelFormatter={label =>
                format(
                  label,
                  timeframe.endsWith('A') ? 'MMM YYYY' : { date: 'medium' }
                )
              }
            />
            <Area
              dataKey="rate"
              stroke="var(--color-lime-500)"
              strokeWidth={2}
              fill="url(#gradient)"
            />
          </>
        )}
      </AreaChart>
    </div>
  )
}
