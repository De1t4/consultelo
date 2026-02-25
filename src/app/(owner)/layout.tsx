import LayoutAuth from '@/components/layout/LayoutAuth';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutAuth>
      {children}
    </LayoutAuth>
  )
}