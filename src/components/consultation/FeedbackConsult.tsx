import { createCommentAction } from '@/actions/comment-mutation'
import { FormDataComment, SchemaComment } from '@/schemas/schema-comment'
import { ResponseConsultDetail } from '@/shared/types/response-consult'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Info } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/Button'


export default function FeedbackConsult({ consultation }: { consultation: ResponseConsultDetail }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDataComment>({
    resolver: zodResolver(SchemaComment),
  })

  const { mutateAsync: createComment } =
    useMutation({ mutationFn: createCommentAction })

  const onSubmit = async (data: FormDataComment) => {
    const res = await createComment({
      ...data,
      consultationId: consultation.id,
      isAnonymous: consultation.settings?.allowAnonymous,
    })
    console.log(res)
  }



  return (
    <>
      {/* Contribute Feedback */}
      <article className="bg-card rounded-lg border border-border p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='feedback' className="font-semibold text-foreground mb-4">Professional Feedback</label>
          <div className={`border border-gray-300 rounded-lg overflow-hidden ${errors.message ? "border-red-500" : ""}`}>
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
          <div className="flex items-center justify-between  pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>All contributions are subject to professional review guidelines.</span>
            </div>
            <Button type='submit' variant="primary">
              Submit Answer
            </Button>
          </div>
        </form>


      </article>
    </>
  )
}
