'use client';
import { ThemeProvider } from '@/hooks/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from 'react';
import { Toaster } from "sileo";

export function Providers({ children, session }: { children: ReactNode, session?: Session | null }) {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Toaster position="top-right" theme='dark' />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}