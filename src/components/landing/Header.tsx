'use client'
import { Button } from '@ui/Button'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b shadow-xs w-full border-gray-100  bg-white sticky  top-0 z-10">
      <div className="max-w-7xl mx-auto px-12 py-4 max-md:px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-3xl text-primary max-md:text-2xl">Consultelo</span>
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
