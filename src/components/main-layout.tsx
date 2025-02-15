import React from 'react';
import { Toaster } from './ui/sonner';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props): React.ReactNode {
  return (
    <>
      <main className='bg-background w-full min-h-screen'>{children}</main>
      <Toaster />
    </>
  );
}
