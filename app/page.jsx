import { lazy, useState } from 'react'

import Logo from './assets/logo.svg'
import Rate from './components/rate'
import Tab from './components/tab'

const History = lazy(() => import('./components/history'))
const Compare = lazy(() => import('./components/compare'))

export default function Page() {
  const [tab, setTab] = useState('history')

  return (
    <>
      <header className="py-4 sm:py-5">
        <Logo className="h-5 sm:h-6.5" />
      </header>
      <main className="py-8 sm:py-12">
        <Rate />
        <section className="mt-10 lg:mt-8">
          <nav className="mb-5 flex gap-2 border-b border-neutral-600">
            <Tab
              label="Historial"
              isActive={tab === 'history'}
              onClick={() => setTab('history')}
            />
            <Tab
              label="Comparativa"
              isActive={tab === 'compare'}
              onClick={() => setTab('compare')}
            />
          </nav>
          {tab === 'history' && <History />}
          {tab === 'compare' && <Compare />}
        </section>
      </main>
    </>
  )
}
