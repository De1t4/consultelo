'use client'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'

export default function HeaderAuth() {
  return (
    <header className="border-b shadow-xs w-full border-gray-50 bg-background fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="cursor-pointer w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Menu className='text-primary' size={20} />
            </div>
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="font-bold text-3xl text-primary max-md:text-2xl">Consultelo</span>
            </Link>
          </div>
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/profile" className="border-2 border-primary cursor-pointer w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <User className='text-primary' size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
