'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Definición del esquema de validación con Zod
const schema = z.object({
  email: z.string().email({ message: 'Ingrese un email válido' }),
  username: z.string().min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
  phone: z.string().min(6, { message: 'El teléfono debe tener al menos 6 caracteres' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  repeatPassword: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
}).refine((data) => data.password === data.repeatPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['repeatPassword'],
});

type FormDataRegister = z.infer<typeof schema>;

export default function RegisterForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormDataRegister) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error al registrar el usuario');
    }
    router.push("/dashboard")

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-gray-300 bg-white p-8 shadow-xl transition-all hover:shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Crear Cuenta</h2>
          <p className="mt-2 text-gray-500">Ingresa tus datos para registrarte</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
                }`}
              placeholder="juan.perez@ejemplo.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/*Username*/}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Nombre de Usuario
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${errors.username ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
                }`}
              placeholder="juan.perez"
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>
          {/*Phone*/}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              id="phone"
              type="text"
              {...register('phone')}
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
                }`}
              placeholder="123456789"
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
          {/* Contraseña */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
                }`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="repeatPassword" className="text-sm font-medium text-gray-700">
              Repetir Contraseña
            </label>
            <input
              id="repeatPassword"
              type="password"
              {...register('repeatPassword')}
              className={`w-full rounded-lg border px-4 py-2.5 text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
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
                Procesando...
              </span>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>
        <p className='mt-4 text-gray-700 text-center'>Have an account?{' '}
          <Link href="/account?auth=login" className='underline text-gray-700 hover:text-gray-800 link-underline-offset-2'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
