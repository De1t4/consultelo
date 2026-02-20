import { FormConsultProvider } from '@/hooks/context/FormConsultContext'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FormConsultProvider>
      {children}
    </FormConsultProvider>
  )
}
