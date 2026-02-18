'use client'
import { useFormConsult } from '@/hooks/context/FormConsultContext'
import ConsultationForm from '../forms/ConsultationForm'
import SettingsForm from '../forms/SettingsForm'
import SuccessConsultPage from './SuccessPage'


export default function WrappedForms() {
  const { currentStep, handleSubmit, onSubmit, isSuccess, consult } = useFormConsult()

  if (isSuccess && consult) {
    return (
      <SuccessConsultPage consult={consult} />
    )
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Step Indicator & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-ping"></div>
            <span className="text-sm font-medium text-gray-600">
              STEP {currentStep === "drafting" ? "1" : "2"} OF 2
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {currentStep === "drafting" ? "Create Consultation" : "Review Inquiry"}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {currentStep === "drafting"
                ? "Detailed inquiry for expert analysis and strategic feedback."
                : "Please review the details before publishing your consultation request."}
            </p>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className={currentStep === "drafting" ? "text-teal-600 font-medium" : "text-gray-400"}>
                Drafting
              </span>
              <span className="text-gray-300">{"›"}</span>
              <span className={currentStep === "review" ? "text-teal-600 font-medium" : "text-gray-400"}>
                Review
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form/Content */}
          <ConsultationForm />
          {/* Right Column - Settings Sidebar */}
          <SettingsForm />
        </form>
      </div>
    </>
  )
}
