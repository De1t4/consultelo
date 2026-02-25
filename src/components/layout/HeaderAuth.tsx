'use client'
import { User } from 'lucide-react'
import Link from 'next/link'

export default function HeaderAuth() {
  return (
    <header className="w-full  max-w-7xl mx-auto  shadow-xs  bg-background  ">
      <div className="  px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <span></span>
          {/* <div className="flex items-center gap-4">
            <div className="cursor-pointer w-10 h-10 rounded-full bg-accent  flex items-center justify-center hover:bg-gray-200 transition-colors">
              <Menu className='text-primary' size={20} />
            </div>
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="font-bold text-3xl text-primary contrast-more:text-primary max-md:text-2xl">Consultelo</span>
            </Link>
          </div> */}
          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/profile" className="border-2 border-primary cursor-pointer w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-gray-200 transition-colors">
              <User className='text-primary' size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
