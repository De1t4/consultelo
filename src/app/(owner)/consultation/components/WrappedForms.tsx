'use client'
import { CreateConsultationResponseDTO, FormDataConsultation, useCreateConsultation } from '@/features/consultations'
import { useFormConsult } from '@/hooks/context/FormConsultContext'
import { useState } from 'react'
import SuccessConsultPage from './SuccessPage'
import ConsultationForm from './form/ConsultationForm'
import SettingsForm from './form/SettingsForm'

export default function WrappedForms() {
  const [consult, setConsult] = useState<CreateConsultationResponseDTO | null>(null)
  const { currentStep, handleSubmit, setCurrentStep } = useFormConsult()

  const { createConsultation, isPending, isSuccess } = useCreateConsultation()

  const onSubmit = async (data: FormDataConsultation) => {
    setCurrentStep("review")
    const res = await createConsultation(data)
    if (res.success) {
      setConsult(res.data)
    }
  }

  if (isSuccess && consult) {
    return (
      <SuccessConsultPage consult={consult} />
    )
  }

  return (
    <>
      {/* Step Indicator & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-2 w-2 rounded-full bg-primary animate-ping"></div>
          <span className="text-sm font-medium text-muted-foreground">
            STEP {currentStep === "drafting" ? "1" : "2"} OF 2
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          {currentStep === "drafting" ? "Create Consultation" : "Review Inquiry"}
        </h2>
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
          <p className="text-sm text-muted-foreground">
            {currentStep === "drafting"
              ? "Detailed inquiry for expert analysis and strategic feedback."
              : "Please review the details before publishing your consultation request."}
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className={currentStep === "drafting" ? "text-primary font-medium" : "text-muted-foreground"}>
              Drafting
            </span>
            <span className="text-muted-foreground">{"›"}</span>
            <span className={currentStep === "review" ? "text-primary font-medium" : "text-muted-foreground"}>
              Review
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Form/Content */}
        <ConsultationForm />
        {/* Right Column - Settings Sidebar */}
        <SettingsForm isPending={isPending} />
      </form>
    </>
  )
}
