import Logo from './assets/logo.svg'
import Rate from './components/rate'

export default function Page() {
  return (
    <>
      <header className="p-4 sm:px-6 sm:py-5">
        <Logo className="h-5 sm:h-6.5" />
      </header>
      <main className="mx-auto max-w-275 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Rate />
      </main>
    </>
  )
}
