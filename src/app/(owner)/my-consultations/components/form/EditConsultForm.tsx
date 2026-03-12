import EditorText from '@/app/(owner)/consultation/components/EditorText'
import { Button } from '@/components/ui/Button'
import { Toggle } from '@/components/ui/Toggle'
import { FormDataConsultation, SchemaConsultation, useUpdateConsultation } from '@/features/consultations'
import { ResponseConsultList } from '@/shared/types/response-consult'
import { categoryOptions, statusOptions } from '@/shared/utils/list-options'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { BookOpen, Eye, Lock } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

export default function EditConsultForm({ consultation, setIsOpen }: { consultation: ResponseConsultList, setIsOpen: (value: boolean) => void }) {
  const queryClient = useQueryClient();

  const { updateConsultation, isPending } = useUpdateConsultation({ consultation })

  const onSubmit = async (data: FormDataConsultation) => {
    updateConsultation(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['consultations'] });
        setIsOpen(false)
      }
    })
  }

  const {
    handleSubmit,
    setValue,
    trigger,
    control,
    register,
    formState: { errors },
  } = useForm<FormDataConsultation>({
    resolver: zodResolver(SchemaConsultation),
    defaultValues: {
      title: consultation.title,
      body: JSON.stringify(consultation.body),
      categories: consultation.categories,
      privacy: consultation.settings?.privacy,
      allowAnonymous: consultation.settings?.allowAnonymous,
      viewComments: consultation.settings?.viewComments,
      status: consultation.status,
    }
  })

  const isPrivate = useWatch({ control, name: "privacy" })
  const isViewComments = useWatch({ control, name: "viewComments" })
  const isAnonymous = useWatch({ control, name: "allowAnonymous" })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 my-4">
      <div >
        <label htmlFor='title' className="block text-sm font-medium text-muted-foreground mb-2">Consultation Title</label>
        <input
          type="text"
          id='title'
          defaultValue={consultation.title}
          {...register("title")}
          placeholder='Ej: How to build a website'
          className="w-full px-3 py-2 bg-background border text-wrap border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor='body' className="block text-sm font-medium text-muted-foreground mb-2">Description and Context</label>
        <EditorText
          body={JSON.stringify(consultation.body)}
          setValue={(value) => {
            setValue("body", value)
            if (errors.body) trigger("body")
          }}
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">
            {errors.body.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor='categories' className="block text-sm font-medium text-muted-foreground mb-2">Industry Category</label>
        <select
          id="categories"
          {...register("categories")}
          defaultValue={consultation.categories}
          className="w-full px-3 py-2 border text-foreground bg-card border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
        >
          <option value="" disabled>Select Status</option>
          {categoryOptions.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='status' className="block text-sm font-medium text-muted-foreground mb-2">Status of Consultation</label>
        <select
          id="status"
          {...register("status")}
          defaultValue={consultation.status}
          className="w-full px-3 py-2 border text-foreground bg-card border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
        >
          <option value="" disabled>Select Status</option>
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Advanced Settings
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="rounded-xl border border-border bg-background overflow-hidden divide-y divide-border">

        {/* Private Mode */}
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary">
              <Lock className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Private Mode</p>
              <p className="text-xs text-muted-foreground mt-0.5">Only people you invite can view this consultation.</p>
            </div>
          </div>
          <div>
            <Toggle checked={isPrivate === "private"} onChange={(checked) => setValue("privacy", checked ? "private" : "public")}></Toggle>
          </div>
        </div>

        {/* Identity Visibility */}
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary">
              <Eye className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">How do others respond?</p>
              <p className="text-xs text-muted-foreground mt-0.5">Choose how others respond to your consultation.</p>
            </div>
          </div>
          <div>
            <Toggle checked={isAnonymous === true} onChange={(checked) => setValue("allowAnonymous", checked ? true : false)}></Toggle>
          </div>

        </div>

        {/* Knowledge Sharing */}
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-primary">
              <BookOpen className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Knowledge Sharing</p>
              <p className="text-xs text-muted-foreground mt-0.5">Allow community to view anonymized responses.</p>
            </div>
          </div>
          <div>
            <Toggle checked={isViewComments ?? false} onChange={(checked) => setValue("viewComments", checked)}></Toggle>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button
          variant='outline'
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          type='submit'
          disabled={isPending}
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
}
