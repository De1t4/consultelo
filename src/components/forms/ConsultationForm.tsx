'use client'
import { useFormConsult } from "@/hooks/context/FormConsultContext"
import { Bold, Italic, LinkIcon, List } from "lucide-react"

export default function ConsultationForm() {
  const { currentStep, register, getValues } = useFormConsult()

  const title = getValues("title")
  const body = getValues("body")
  const categories = getValues("categories")

  return (
    <>
      <div className="lg:col-span-2">
        {currentStep === "drafting" ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-8">
            {/* Consultation Title */}
            <div>
              <label htmlFor='title' className="block text-sm font-semibold text-gray-900 mb-3">
                Consultation Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title")}
                placeholder="e.g. Market Entry Strategy for Fintech in SE Asia"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-teal-500 outline-none text-lg transition-colors placeholder:text-gray-300"
              />
            </div>

            {/* Description & Context */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Description & Context
              </label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Bold className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Italic className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="h-6 w-px bg-gray-300 mx-1"></div>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <List className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <LinkIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Text Area */}
                <textarea
                  {...register("body")}
                  id='body'
                  placeholder="Tell us about your challenges, specific goals, and what you hope to achieve..."
                  rows={12}
                  className="w-full px-4 py-4 outline-none resize-none text-gray-600 placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Industry Categories */}
            <div>
              <label htmlFor='categories' className="block text-sm font-semibold text-gray-900 mb-3">
                Industry Categories
              </label>
              <select
                id="categories"
                {...register("categories")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Seleccione...</option>
                <option value="software">Software</option>
                <option value="IA">IA</option>
                <option value="business">Business</option>
                <option value="company">Company</option>
                <option value="strategy">Strategy</option>
                <option value="other">Other</option>
              </select>

              <div className="flex items-start gap-2 text-xs text-gray-500">
                <div className="h-4 w-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">i</span>
                </div>
                <p>Helps match you with the right experts. Up to 5 allowed.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
            {/* Consultation Title */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                CONSULTATION TITLE
              </p>
              <h2 className="text-2xl font-bold text-gray-900">
                {title}
              </h2>
            </div>

            {/* Description & Context */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                DESCRIPTION & CONTEXT
              </p>
              <div className="text-gray-700 space-y-4 whitespace-pre-line">
                {body}
              </div>
            </div>

            {/* Industry Categories */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                INDUSTRY CATEGORIES
              </p>
              <div className="flex flex-wrap gap-2">
                <span
                  key={categories}
                  className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium"
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
