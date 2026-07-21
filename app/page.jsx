import { lazy } from 'react'

import Logo from './assets/logo.svg'
import Rate from './components/rate'
import Tab from './components/tab'

const History = lazy(() => import('./components/history'))

export default function Page() {
  return (
    <>
      <header className="py-4 sm:py-5">
        <Logo className="h-5 sm:h-6.5" />
      </header>
      <main className="py-8 sm:py-12">
        <Rate />
        <section className="mt-10 lg:mt-8">
          <nav className="mb-5 flex gap-2 border-b border-neutral-600">
            <Tab label="Historial" isActive />
          </nav>
          <History />
        </section>
      </main>
    </>
  )
}
