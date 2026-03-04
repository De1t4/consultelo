'use client';

import { FormDataRegister, SchemaRegister } from '@/app/(auth)/schemas/schema-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { sileo } from 'sileo';

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [attempt, setAttempt] = useState(0);

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(SchemaRegister),
  });

  const onSubmit = async (data: FormDataRegister) => {
    if (attempt >= 3) {
      setError("Too many attempts. Please try again later.");
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json()
      setError(error.error)
      setAttempt(attempt + 1)
      throw new Error('Error registering the user');
    }

    sileo.success({
      title: "User registered successfully",
      description: "You can now login with your credentials",
    });
    router.push("/account?auth=login")
  };

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="mt-2 text-gray-500">Enter your details to register</p>
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
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
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
        {/*Username*/}
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-primary/20 focus:ring-2 focus:ring-primary ${errors.username ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
              }`}
            placeholder="juan.perez"
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>
        {/*Phone*/}
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="number"
            {...register('phone')}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-primary/20 focus:ring-2 focus:ring-primary ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
              }`}
            placeholder="123456789"
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone.message}</p>
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
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-primary/20 focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
              }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="repeatPassword" className="text-sm font-medium text-gray-700">
            Repeat Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            {...register('repeatPassword')}
            className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-primary/20 focus:ring-2 focus:ring-primary ${errors.password ? 'border-red-500 focus:ring-red-400' : 'border-gray-300'
              }`}
            placeholder="••••••••"
          />
          {errors.repeatPassword && (
            <p className="text-xs text-red-500">{errors.repeatPassword.message}</p>
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
            'Register'
          )}
        </button>
      </form>
      <p className='mt-4 text-gray-700 text-center'>Have an account?{' '}
        <Link href="/account?auth=login" className='underline text-primary font-medium hover:text-primary/80 link-underline-offset-2'>
          Sign in
        </Link>
      </p>
    </>
  );
}
