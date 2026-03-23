import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Consultelo</span>
            </div>
            <p className="text-sm text-gray-600">
              Empowering professionals with expert knowledge and tailored solutions.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Browse Professionals</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">How it Works</Link></li>
              {/* <li><Link href="#" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Pricing</Link></li> */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="text-sm text-gray-600 hover:text-teal-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Consultelo Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
