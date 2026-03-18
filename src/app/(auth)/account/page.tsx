'use client'
import LoginForm from '@/app/(auth)/components/LoginForm';
import RegisterForm from '@/app/(auth)/components/RegisterForm';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams()
  const auth = searchParams.get('auth')

  const account = auth !== 'login' ? 'register' : 'login';

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <section className="w-full max-w-md rounded-2xl border-2  border-gray-300 bg-white p-8 shadow-xl transition-all hover:shadow-2xl">
        {account === 'login' && <LoginForm />}
        {account === 'register' && <RegisterForm />}
      </section>
    </main>
  )
}
