import Header from '@/components/landing/Header';
import HeaderAuth from '@/components/layout/HeaderAuth';
import { authOptions } from '@/shared/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

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