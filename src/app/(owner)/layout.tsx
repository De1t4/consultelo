import HeaderAuth from '@/components/layout/HeaderAuth'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderAuth />
      {children}
    </>
  )
}