'use client'
import { useFormConsult } from "@/hooks/context/FormConsultContext"
import RichTextDisplay from "@/app/(owner)/consultation/components/RichTextDisplay"
import EditorText from "../EditorText"

export default function ConsultationForm() {
  const { currentStep, register, getValues, errors, setValue } = useFormConsult()

  const title = getValues("title")
  const body = getValues("body")
  const categories = getValues("categories")

  return (
    <>
      <div className="lg:col-span-2">
        {currentStep === "drafting" ? (
          <div className="bg-card rounded-lg border border-border p-8 space-y-8">
            <div>
              <label htmlFor='title' className="block text-sm font-semibold text-foreground mb-3">
                Consultation Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                maxLength={100}
                placeholder="e.g. Market Entry Strategy for Fintech in SE Asia"
                className={`w-full px-4 py-3 border-b-2 text-foreground ${errors.title ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"}  outline-none text-lg transition-colors placeholder:text-muted-foreground/40`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description & Context */}
            <div>
              <label htmlFor="body" className="block text-sm font-semibold text-foreground mb-3">
                Description & Context
              </label>
              <EditorText body={body} setValue={(value) => setValue("body", value)} />
              {errors.body && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.body.message}
                </p>
              )}
            </div>

            {/* Industry Categories */}
            <div>
              <label htmlFor='categories' className="block text-sm font-semibold text-foreground mb-3">
                Industry Category
              </label>
              <select
                id="categories"
                {...register("categories")}
                className="w-full px-3 py-2 border text-foreground bg-card border-border rounded-lg text-sm outline-none focus:border-primary transition-colors"
              >
                <option value="">Select...</option>
                <option value="software">Software</option>
                <option value="IA">IA</option>
                <option value="business">Business</option>
                <option value="company">Company</option>
                <option value="strategy">Strategy</option>
                <option value="other">Other</option>
              </select>

              <div className="flex items-start gap-2 text-xs text-muted-foreground mt-2">
                <div className="h-4 w-4 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent-foreground text-xs font-bold">i</span>
                </div>
                <p>Helps users have more context for their answers</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border p-8 space-y-6">
            {/* Consultation Title */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                CONSULTATION TITLE
              </p>
              <h2 className="text-2xl font-bold text-foreground">
                {title}
              </h2>
            </div>

            {/* Description & Context */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                DESCRIPTION & CONTEXT
              </p>
              <RichTextDisplay content={body} />
            </div>

            {/* Industry Categories */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                INDUSTRY CATEGORIES
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  key={categories}
                  className="px-3 py-1.5 bg-accent text-primary rounded-lg text-sm font-bold"
                >
                  {categories}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>

  )
}
