import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '../ui/Button'

const SchemaContact = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

export type FormDataContact = z.infer<typeof SchemaContact>

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataContact>({
    resolver: zodResolver(SchemaContact),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const onSubmit = async (data: FormDataContact) => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message')
      }
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We will get back to you soon.' 
      })
      reset()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while sending the message.'
      setSubmitStatus({ 
        type: 'error', 
        message: errorMessage
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {submitStatus && (
        <div className={`p-3 rounded-lg text-sm ${submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {submitStatus.message}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor='fullname' className="text-sm font-medium text-gray-900">Full Name</label>
          <input
            type="text"
            id='fullname'
            placeholder="John Doe"
            {...register("fullname")}
            className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor='email' className="text-sm font-medium text-gray-900">Professional Email</label>
          <input
            type="email"
            id='email'
            placeholder="john@company.com"
            {...register("email")}
            className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor='subject' className="text-sm font-medium text-gray-900">Subject</label>
        <div className="relative">
          <select
            id='subject'
            {...register("subject")}
            defaultValue={""}
            className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-9"
          >
            <option value="" disabled selected>Select a topic</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="billing">Billing</option>
            <option value="partnership">Partnership</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-800" />
        </div>
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">
            {errors.subject.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor='message' className="text-sm font-medium text-gray-900">Message</label>
        <textarea
          id='message'
          rows={5}
          {...register("message")}
          placeholder="How can we help you?"
          className="resize-none rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>)
}
