import HeaderAuth from '@/components/layout/HeaderAuth'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderAuth />
      <main className="max-w-7xl mx-auto px-6 py-8 mt-20">
        {children}
      </main>
    </>
  )
}