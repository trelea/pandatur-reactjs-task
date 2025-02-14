import { Form } from '@/components/ui/form';
import React from 'react';
import Field from '../components/field';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { useRegister } from '../hooks/useRegister';
import { LoaderIcon } from 'lucide-react';

export default function RegisterForm({
  className,
  // @ts-ignore
  ...props
}: React.HTMLAttributes<HTMLFormElement>): React.ReactNode {
  const { form, onSubmit, pending, error } = useRegister();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('', className)}
      >
        <h1 className='text-3xl font-semibold text-center'>Register</h1>
        <Field
          form={form}
          name='email'
          type='email'
          label='Email'
          placeholder='Email'
          style={{
            label: { className: 'text-base' },
            input: {
              className: 'rounded text-base',
            },
          }}
        />

        <Field
          form={form}
          name='username'
          type='text'
          label='Username'
          placeholder='Username'
          style={{
            label: { className: 'text-base' },
            input: {
              className: 'rounded text-base',
            },
          }}
        />

        <Field
          form={form}
          name='password'
          type='password'
          label='Password'
          placeholder='Password'
          style={{
            label: { className: 'text-base' },
            input: {
              className: 'rounded text-base',
            },
          }}
        />

        <Button
          disabled={pending}
          type='submit'
          className='w-full bg-primary rounded text-lg font-semibold'
        >
          {pending ? <LoaderIcon className='animate-spin' /> : 'Register'}
        </Button>

        {error && (
          <div className='flex justify-center items-center gap-1 text-destructive flex-col text-sm'>
            <p>An error occured.</p>
            <p>{error.message}</p>
          </div>
        )}

        <div className='flex justify-center items-center gap-1'>
          <p>Have account ? </p>
          <p className='font-semibold text-primary hover:underline'>
            <Link to={'/login'}>Login</Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
