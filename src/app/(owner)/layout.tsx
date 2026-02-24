'use client'
import Header from '@/components/landing/Header';
import HeaderAuth from '@/components/layout/HeaderAuth';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  return (
    <>
      {
        session ? (
          <HeaderAuth />
        ) : (
          <Header />
        )
      }
      <main className="max-w-7xl mx-auto px-6 py-8 mt-20">
        {children}
      </main>
    </>
  )
}