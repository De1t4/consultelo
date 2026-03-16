import { MapPinOff } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="flex flex-col items-center gap-8 max-w-md text-center">
        {/* 404 Illustration */}
        <div className="relative flex items-center justify-center gap-2 mb-4">
          <span className="text-8xl font-bold text-primary">4</span>

          {/* Center icon - circle with slash */}
          <div className="relative flex items-center justify-center">
            <MapPinOff className='size-20 text-primary' />
          </div>

          <span className="text-8xl font-bold text-primary">4</span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved to a new destination.
          </p>
        </div>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90 active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
