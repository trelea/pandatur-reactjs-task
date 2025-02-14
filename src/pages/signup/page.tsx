import Layout from '@/components/main-layout';
import RegisterForm from '@/features/auth/forms/register';
import React from 'react';

export default function Signup(): React.ReactNode {
  return (
    <Layout>
      <div className='flex justify-center items-center h-screen'>
        <RegisterForm className='flex flex-col gap-6 border px-8 py-16 shadow-xl rounded w-[400px]' />
      </div>
    </Layout>
  );
}
