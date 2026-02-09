import LoginForm from '@/client/components/LoginForm'
import { getServerSession } from 'next-auth'
import React from 'react'

export default function page() {

  return (
    <LoginForm />
  )
}
