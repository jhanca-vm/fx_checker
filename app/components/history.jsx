import clsx from 'clsx/lite'

import useHistory from '../hooks/use-history'
import Chart from './chart'
import DataPoint from './data-point'
import Timeframe from './timeframe'

export default function History() {
  const {
    timeframe,
    data,
    open,
    last,
    change,
    isPositive,
    isLoading,
    setTimeframe
  } = useHistory()

  return (
    <div className="flex flex-wrap max-lg:flex-col lg:items-center lg:gap-5">
      <dl className="grid grow grid-cols-2 gap-2.5 sm:flex sm:gap-4">
        <DataPoint title="Apertura" value={open} isLoading={isLoading} />
        <DataPoint title="Último" value={last} isLoading={isLoading} />
        <DataPoint
          className={clsx(
            isPositive && 'text-green-500',
            change < 0 && 'text-red-500'
          )}
          title="Variación"
          value={
            (isPositive ? '▲ +' : '▼ ') +
            `${((change / open) * 100).toFixed(2)}%`
          }
          isLoading={isLoading}
        />
      </dl>
      <div
        className={clsx(
          'mt-5 mb-4 w-fit rounded-lg bg-neutral-700 p-0.5 text-xs/tight',
          'tracking-wide sm:mb-5 lg:my-0'
        )}
      >
        <Timeframe
          value="7D"
          isActive={timeframe === '7D'}
          onClick={setTimeframe}
        />
        <Timeframe
          value="1M"
          isActive={timeframe === '1M'}
          onClick={setTimeframe}
        />
        <Timeframe
          value="3M"
          isActive={timeframe === '3M'}
          onClick={setTimeframe}
        />
        <Timeframe
          value="1A"
          isActive={timeframe === '1A'}
          onClick={setTimeframe}
        />
        <Timeframe
          value="5A"
          isActive={timeframe === '5A'}
          onClick={setTimeframe}
        />
      </div>
      <Chart timeframe={timeframe} data={data} isLoading={isLoading} />
    </div>
  )
}
