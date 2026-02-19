"use client"

import { ArrowRight, Check, Copy, Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ResponseConsult } from "@/shared/types/response-consult"

export default function SuccessConsultPage({ consult }: { consult: ResponseConsult }) {
  const [copied, setCopied] = useState(false)
  const consultationUrl = `https://consultelo.vercel.app/consultation/${consult.consultationId}`

  const handleCopy = () => {
    navigator.clipboard.writeText(consultationUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50/30 to-white">
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer rings */}
            <div className="absolute inset-0 -m-12 rounded-full bg-teal-100/40 animate-pulse"></div>
            <div className="absolute inset-0 -m-8 rounded-full bg-teal-100/60 animate-pulse delay-75"></div>
            {/* Check icon */}
            <div className="relative h-24 w-24 rounded-full bg-teal-500 flex items-center justify-center shadow-lg">
              <Check className="h-12 w-12 text-white stroke-3" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Consultation Published Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Your inquiry is now live and visible to our network of experts.
            <br />
            Get ready to receive proposals.
          </p>
        </div>

        {/* Inquiry Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="mb-6">
            <p className="text-xs font-bold text-teal-500 uppercase tracking-wide mb-2">
              YOUR INQUIRY
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {consult.title}
            </h2>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">
              Link to your consultation
            </p>
            <div className="flex items-center gap-3 max-md:flex-col">
              <div className="flex-1 min-w-0 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 ">
                <code className="text-sm text-gray-700 font-mono break-all whitespace-normal">
                  {consultationUrl}
                </code>
              </div>
              <button
                onClick={handleCopy}
                className="flex h-auto items-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Copy className="h-4 w-4 max-md:h-6 max-md:w-6" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            target="_blank"
            href={`/consultation/${consult.consultationId}`}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors font-semibold text-center shadow-sm"
          >
            Go to my Consultation
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/dashboard"
            target="_blank"
            className="flex-1 px-6 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-center"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* What's Next */}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            WHAT{"'"}S NEXT?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <Share2 className="h-4 w-4 text-blue-500" />
              Share with a friend
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
