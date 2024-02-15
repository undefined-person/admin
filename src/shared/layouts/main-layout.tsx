import { ReactNode } from 'react'

import { Header } from '@/widgets/header'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <section className="container px-8 pb-8 mx-auto mt-4">{children}</section>
    </>
  )
}
