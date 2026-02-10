import { Button } from '@/client/ui/Button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b shadow-md w-full border-gray-100 dark:border-gray-800 bg-background fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">Consultalo</span>
          </Link>
          {/* Navigation */}

          <div className="flex items-center gap-4">
            {/* <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer text-foreground"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Sun className="h-5 w-5 text-gray-900" />
                ) : (
                  <Moon className="h-5 w-5 text-white" />
                )}
              </button> */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer text-gray-800 border-gray-50 dark:border-gray-800 border-2 font-semibold">
                  Sign In
                </Button>
              </Link>
              <Button variant="primary" className="flex items-center gap-2 w-32 max-md:w-28 cursor-pointer font-semibold ">
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
