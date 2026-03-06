'use client';

import { FormDataConsultation, SchemaConsultation, initialValuesConsultation } from '@/schemas/schema-consultation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, useState } from 'react';
import { Control, FieldErrors, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch, useForm } from 'react-hook-form';

type Step = "drafting" | "review"

interface ConsultContextType {
  currentStep: Step
  setCurrentStep: (step: Step) => void
  register: UseFormRegister<FormDataConsultation>
  handleSubmit: UseFormHandleSubmit<FormDataConsultation>
  errors: FieldErrors<FormDataConsultation>
  getValues: UseFormGetValues<FormDataConsultation>
  setValue: UseFormSetValue<FormDataConsultation>
  watch: UseFormWatch<FormDataConsultation>
  trigger: UseFormTrigger<FormDataConsultation>
  control: Control<FormDataConsultation>
}

const FormConsultContext = createContext<ConsultContextType | undefined>(undefined);

export function FormConsultProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<Step>("drafting")

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<FormDataConsultation>({
    resolver: zodResolver(SchemaConsultation),
    defaultValues: { ...initialValuesConsultation, privacy: "private" }
  })

  return (
    <FormConsultContext.Provider value={{
      currentStep,
      setCurrentStep,
      register,
      handleSubmit,
      errors,
      getValues,
      setValue,
      watch,
      control,
      trigger,
    }}>
      {children}
    </FormConsultContext.Provider>
  );
}

export function useFormConsult() {
  const context = useContext(FormConsultContext);
  if (context === undefined) {
    throw new Error('useFormConsultContext must be used within a FormConsultProvider');
  }
  return context;
}