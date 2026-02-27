'use client'

import { FormDataLogin, SchemaLogin } from '@/app/(auth)/schemas/schema-login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sileo } from 'sileo';

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [attempt, setAttempt] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(SchemaLogin),
  });

  const router = useRouter();

  const onSubmit = async (data: FormDataLogin) => {
    if (attempt >= 3) {
      setError("Too many attempts. Please try again later.");
      return;
    }
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (!res?.ok) {
      setError(res?.error?.toString())
      setAttempt(attempt + 1)
      return
    }

    sileo.success({
      title: "User logged in successfully",
    });

    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-gradient-to-br from-primary to-blue-100 p-4 ">
      <div className="w-full max-w-md rounded-2xl border-2  border-gray-300 bg-white p-8 shadow-xl transition-all hover:shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          <p className="mt-2 text-gray-500">Enter your details to sign in</p>
        </div>
        {
          error && (
            <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )
        }
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 ">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-primary/20 focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
                }`}
              placeholder="juan.perez@ejemplo.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              autoComplete='off'
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-primary/20 focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
                }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Botón de Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg cursor-pointer bg-primary px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-primary/80 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-primary/70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
                Processing...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <p className='mt-4 text-gray-700 text-center '>
          Don&apos;t have an account?{' '}
          <Link href="/account?auth=register" className='underline text-primary font-medium hover:text-primary/80 link-underline-offset-2'>
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
