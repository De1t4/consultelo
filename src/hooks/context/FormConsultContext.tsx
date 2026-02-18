'use client';

import { createConsultationAction } from '@/actions/consultation-action';
import { FormDataConsultation, SchemaConsultation, initialValuesConsultation } from '@/schemas/schema-consultation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch, useForm } from 'react-hook-form';

type Step = "drafting" | "review"

interface ConsultContextType {
  currentStep: Step
  setCurrentStep: (step: Step) => void
  onSubmit: (data: FormDataConsultation) => void
  register: UseFormRegister<FormDataConsultation>
  handleSubmit: UseFormHandleSubmit<FormDataConsultation>
  errors: FieldErrors<FormDataConsultation>
  isSubmitting: boolean
  getValues: UseFormGetValues<FormDataConsultation>
  setValue: UseFormSetValue<FormDataConsultation>
  watch: UseFormWatch<FormDataConsultation>
  trigger: UseFormTrigger<FormDataConsultation>
}

const FormConsultContext = createContext<ConsultContextType | undefined>(undefined);

export function FormConsultProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>("drafting")
  const mutation = useMutation({ mutationFn: createConsultationAction })

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormDataConsultation>({
    resolver: zodResolver(SchemaConsultation),
    defaultValues: { ...initialValuesConsultation, privacy: "private" }
  })

  const onSubmit = async (data: FormDataConsultation) => {
    setCurrentStep("review")
    mutation.mutate(data)
  }


  return (
    <FormConsultContext.Provider value={{
      currentStep,
      setCurrentStep,
      onSubmit,
      register,
      handleSubmit,
      errors,
      isSubmitting,
      getValues,
      setValue,
      watch,
      trigger
    }}>
      {children}
    </FormConsultContext.Provider>
  );
}

export function useFormConsult() {
  const context = useContext(FormConsultContext);
  if (context === undefined) {
    throw new Error('useFormConsultContext must be used within a ThemeProvider');
  }
  return context;
}