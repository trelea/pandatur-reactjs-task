import Layout from '@/components/main-layout';
import LoginForm from '@/features/auth/forms/login';
import React from 'react';

export default function Login(): React.ReactNode {
  return (
    <Layout>
      <div className='flex justify-center items-center h-screen'>
        <LoginForm className='flex flex-col gap-6 border px-8 py-16 shadow-xl rounded w-[400px]' />
      </div>
    </Layout>
  );
}
