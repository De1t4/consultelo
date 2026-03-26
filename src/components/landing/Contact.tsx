"use client"

import { ChevronDown, Linkedin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import ContactForm from './ContactForm'

const faqItems = [
  {
    question: "How do I ask a question as a user?",
    answer: "You can find professionals in our directory, ask your questions clearly, and receive structured answers in real time.",
  },
  {
    question: "Is my personal data protected?",
    answer: "Yes! Security and privacy are our top priorities. Your information and all of your consultations are always protected.",
  },
  {
    question: "Are there tools for professionals and businesses?",
    answer: "Absolutely. You can manage your profile, administer customer consultations, use rich text tools to reply, and keep track of your schedule and team.",
  },
  {
    question: "Can I use Consultelo on my phone?",
    answer: "Yes, our interface is extremely fast, dynamic, and friendly, specifically designed to adapt seamlessly to any device.",
  },
]

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  return (
    <section className="bg-gray-100 border-t border-gray-200 py-20" id='contact'>
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
                    Whether you are a professional offering services or a user looking for answers, our team is ready to help you. Reach out and we&apos;ll respond within 24 hours.
                  </p>
                </div>
                <div className="flex flex-col gap-3 ">
                  <div className="flex items-center gap-3 rounded-lg border border-gray-100 shadow-sm bg-gray-100 px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary">
                      <Mail className="size-4" />
                    </div>
                    <div className=''>
                      <p className="text-xs font-semibold text-gray-900">Email Us</p>
                      <p className="text-xs text-gray-600 break-all whitespace-normal">mauriciochambicaceres@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-100 shadow-sm bg-gray-100 px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">Call Us</p>
                      <p className="text-xs text-gray-600">+54-11-6191-0935</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gray-800 uppercase mb-3">
                    Follow Our Journey
                  </p>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: <Linkedin className="size-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/mauriciochambi/" },
                    ].map(({ icon, label, href }) => (
                      <Link href={href} key={label} target='_blank'>
                        <button
                          aria-label={label}
                          className="flex size-8 items-center justify-center cursor-pointer rounded-lg border border-gray-200 bg-gray-200 text-gray-600 transition-colors hover:border-primary hover:text-primary"
                        >
                          {icon}
                        </button>
                      </Link>
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
