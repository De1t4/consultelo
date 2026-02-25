'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import Header from '../landing/Header'
import HeaderAuth from './HeaderAuth'
import { Sidebar } from './Sidebar'

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  const renderHeader = () => {
    if (session) {
      return <HeaderAuth />
    }
    return <Header />
  }

  return (
    <main>
      {session && <Sidebar />}
      <div className={`${session ? 'ml-24' : ''} max-md:ml-0 max-w-screen`}>
        {renderHeader()}
        <div className="mx-auto px-6 py-8 max-w-7xl">
          {children}
        </div>
      </div>
    </main>
  )
}
