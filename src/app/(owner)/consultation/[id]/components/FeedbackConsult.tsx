"use client"

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useCreateComment } from '@/hooks/use/use-comment-mutation';
import { FormDataComment, SchemaComment } from '@/schemas/schema-comment';
import { ResponseConsultDetail } from '@/shared/types/response-consult';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FeedbackConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  const [open, setOpen] = useState(false);


  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm<FormDataComment>({
    resolver: zodResolver(SchemaComment),
  })

  const { createComment, isPending } = useCreateComment();

  const onSubmit = async (data: FormDataComment) => {
    await createComment({
      ...data,
      consultationId: consultation.id,
      isAnonymous: consultation.settings?.allowAnonymous,
    })
    setOpen(false)
  }

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} showCloseButton={false} title='Enter an author name'>
        <div className="flex flex-col gap-2 h-48 justify-around">
          <div className="flex flex-col gap-2">
            <label htmlFor='feedback' className="font-semibold text-foreground ">Author Name</label>
            <input
              type="text"
              placeholder='Ej: John Doe'
              {...register("authorName")}
              className={`w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${errors.authorName ? "border-red-500" : ""}`}
            />
            {errors.authorName && (
              <p className="text-red-500 text-xs ">
                {errors.authorName.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button variant="outline" type='button' onClick={() => setOpen(false)}>Cancel</Button>
            <Button disabled={isPending} variant="primary" type='submit' form='form-feedback'>Submit</Button>
          </div>
        </div>
      </Modal>
      {/* Contribute Feedback */}
      <article className="bg-card rounded-lg border border-border p-6">
        <form id='form-feedback' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='feedback' className="font-semibold text-foreground mb-4">Professional Feedback</label>
          <div className={`border border-border rounded-lg overflow-hidden ${errors.message ? "border-red-500" : ""}`}>
            {/* Text Area */}
            <textarea
              className="w-full p-4 text-sm text-muted-foreground focus:outline-none resize-none"
              rows={8}
              placeholder="Type your professional advice here... Reference specific codes or standards where applicable..."
              {...register("message")}
            />
          </div>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
          <div className="flex items-center justify-between  pt-4 max-md:flex-col max-md:items-start gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>All contributions are subject to professional review guidelines.</span>
            </div>
            <Button disabled={isPending} onClick={async () => {
              const isValid = await trigger(["message"])
              if (isValid) {
                if (consultation.settings?.allowAnonymous) {
                  setOpen(true)
                } else {
                  setValue("authorName", "Registered User")
                  handleSubmit(onSubmit)
                }
              }
            }} type={consultation.settings?.allowAnonymous ? "button" : "submit"} variant="primary" className='max-md:w-full max-md:items-end max-md:h-10' >
              {isPending ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </form>
      </article>
    </>
  )
}
