'use client'
import { User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/Button'

export default function HeaderAuth() {
  const { data: session } = useSession()

  return (
    <header className="w-full max-w-7xl mx-auto border-b border-border shadow-xs  bg-background sticky top-0  z-20">
      <div className="px-12 py-4 max-md:px-4">
        <div className="flex items-center justify-between">
          {
            !session ?
              <>
                <Link href="/account?auth=login">
                  <Button variant="outline" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer text-gray-800 border-gray-50 border-2 font-semibold">
                    Sign In
                  </Button>
                </Link>
                <Link href="/account?auth=register">
                  <Button variant="primary" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer font-semibold ">
                    Register
                  </Button>
                </Link>
              </>
              : <>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <span className="font-bold text-3xl text-primary contrast-more:text-primary max-md:text-2xl">Consultelo</span>
                </Link>
                <div className="flex items-center gap-4 ">
                  <Link href="/settings" className="border-2 border-primary cursor-pointer w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <User className='text-primary' size={24} />
                  </Link>
                </div>
              </>
          }
          {/* Navigation */}

        </div>
      </div>
    </header>
  )
}
