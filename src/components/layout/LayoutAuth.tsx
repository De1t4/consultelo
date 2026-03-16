'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import HeaderAuth from './HeaderAuth'
import { Sidebar } from './Sidebar'

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <main>
      {session && <Sidebar />}
      <div className={`${session ? 'ml-18' : ''} max-md:ml-0 max-w-screen`}>
        <HeaderAuth />
        <div className="mx-auto px-12 pb-20 pt-4 max-w-7xl max-md:px-4">
          {children}
        </div>
      </div>
    </main>
  )
}
