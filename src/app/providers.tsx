'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@/client/context/ThemeContext';
import { Session } from 'next-auth';

export function Providers({ children, session }: { children: ReactNode, session?: Session | null }) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}