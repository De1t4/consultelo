'use client'
import Link from 'next/link'
import { Button } from '@ui/Button'
import { useSession } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b shadow-md w-full border-gray-100  bg-background fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-3xl text-primary">Consultelo</span>
          </Link>
          {/* Navigation */}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              {
                session ?
                  <Link href="/dashboard">
                    <Button variant="primary" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer font-semibold ">
                      Dashboard
                    </Button>
                  </Link>
                  : <>
                    <Link href="/account?auth=login">
                      <Button variant="ghost" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer text-gray-800 border-gray-50 border-2 font-semibold">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/account?auth=register">
                      <Button variant="primary" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer font-semibold ">
                        Register
                      </Button>
                    </Link>
                  </>
              }

            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
