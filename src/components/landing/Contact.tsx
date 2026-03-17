"use client"

import { ChevronDown, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import ContactForm from './ContactForm'

const faqItems = [
  {
    question: "How do I contact an expert directly?",
    answer: "You can browse our expert directory, filter by specialty, and send a direct consultation request. Experts typically respond within 2–4 hours during business days.",
  },
  {
    question: "What are the privacy options?",
    answer: "We offer Private Mode to restrict visibility to invited participants only, and you can control Identity Visibility between Public Profile, Anonymous, or Custom alias.",
  },
  {
    question: "How are payments handled?",
    answer: "All transactions are processed securely via Stripe. You can pay per session or subscribe to a monthly plan. Invoices are sent automatically after each consultation.",
  },
  {
    question: "Do you offer 24/7 technical support?",
    answer: "Our technical support team is available Monday–Friday 9am–8pm EST. For urgent issues outside these hours, you can submit a priority ticket and we will respond within 4 hours.",
  },
]

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  return (
    <section className="bg-gray-100 border-t border-gray-200 py-20">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4">
        <article className="mb-8 w-full border border-gray-200 bg-white">
          <div className="rounded-xl w-full ">
            <div className="flex max-md:flex-col ">
              {/* Left: Contact info */}
              <div className="p-6 w-1/2 max-md:w-full md:p-8 flex flex-col gap-6 border-b border-gray-200 md:border-b-0 md:border-r">
                <div className=' w-full'>
                  <span className="inline-block border border-gray-200 rounded-full px-3 py-1 text-xs font-semibold tracking-widest text-primary uppercase mb-4">
                    Contact Support
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    Get in <span className="text-primary">Touch</span>
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Our team of experts is ready to help your business grow. Reach out and we&apos;ll respond within 24 hours.
                  </p>
                </div>
                <div className="flex flex-col gap-3 ">
                  <div className="flex items-center gap-3 rounded-lg border border-gray-100 shadow-sm bg-gray-100 px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary">
                      <Mail className="size-4" />
                    </div>
                    <div className=''>
                      <p className="text-xs font-semibold text-gray-900">Email Us</p>
                      <p className="text-xs text-gray-600 break-all whitespace-normal">support@consultpro.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-100 shadow-sm bg-gray-100 px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Call Us</p>
                      <p className="text-xs text-gray-600">+1 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-100 shadow-sm bg-gray-100 px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Visit Office</p>
                      <p className="text-xs text-gray-600">123 Business Ave, Tech City</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gray-800 uppercase mb-3">
                    Follow Our Journey
                  </p>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: <Linkedin className="size-5" />, label: "LinkedIn" },
                      { icon: <Instagram className="size-5" />, label: "Instagram" },
                    ].map(({ icon, label }) => (
                      <button
                        key={label}
                        aria-label={label}
                        className="flex size-8 items-center justify-center cursor-pointer rounded-lg border border-gray-200 bg-gray-200 text-gray-600 transition-colors hover:border-primary hover:text-primary"
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Right: Form */}
              <div className="p-6 w-1/2 max-md:w-full">
                <h3 className="text-base font-semibold text-gray-900 mb-5">Send us a message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </article>
        {/* FAQ Section */}
        <article className="mb-8 ">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-primary" />
          </div>
          <div className="flex flex-col gap-2">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-gray-200 bg-gray-200"
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-200/80 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  type='button'
                >
                  <span className="text-sm font-medium text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-gray-800 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-gray-200 px-5 py-4 bg-gray-100">
                    <p className="text-sm text-gray-800 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
