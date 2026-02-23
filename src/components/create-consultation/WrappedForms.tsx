'use client'
import { createConsultationAction } from '@/actions/consultation-action'
import { useFormConsult } from '@/hooks/context/FormConsultContext'
import { FormDataConsultation } from '@/schemas/schema-consultation'
import { ResponseConsult } from '@/shared/types/response-consult'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import ConsultationForm from '../forms/ConsultationForm'
import SettingsForm from '../forms/SettingsForm'
import SuccessConsultPage from './SuccessPage'


export default function WrappedForms() {
  const [consult, setConsult] = useState<ResponseConsult | null>(null)
  const { currentStep, handleSubmit, setCurrentStep } = useFormConsult()

  const { mutateAsync: createConsultation, isPending, isSuccess } = useMutation({ mutationFn: createConsultationAction })

  const onSubmit = async (data: FormDataConsultation) => {
    setCurrentStep("review")
    const res = await createConsultation(data)
    setConsult(res)
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
        <h1 className="text-4xl font-bold text-foreground mb-2">
          {currentStep === "drafting" ? "Create Consultation" : "Review Inquiry"}
        </h1>
        <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-2">
          <p className="text-muted-foreground">
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
