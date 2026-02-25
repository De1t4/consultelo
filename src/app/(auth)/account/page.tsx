'use client'
import LoginForm from '@/app/(auth)/components/LoginForm';
import RegisterForm from '@/app/(auth)/components/RegisterForm';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams()
  const auth = searchParams.get('auth')

  const account = auth !== 'login' ? 'register' : 'login';

  return (
    <>
      {account === 'login' && <LoginForm />}
      {account === 'register' && <RegisterForm />}
    </>
  )
}
