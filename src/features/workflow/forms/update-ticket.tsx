import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React from 'react';
import Field from '../components/field';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/stores/tickets/types';
import { useUpdateTicket } from '../hooks/useUpdateTicket';

export default function UpdateTicketForm({
  ticket,
  cb,
  className,
  // @ts-ignore
  ...props
}: React.HTMLAttributes<HTMLFormElement> & {
  ticket: Ticket;
  cb?: () => void;
}): React.ReactNode {
  const { form, onSubmit } = useUpdateTicket({ ticket, cb });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('', className)}
      >
        <Field
          form={form}
          name='title'
          type='text'
          label='Title'
          placeholder='Title'
          style={{
            label: { className: 'text-base' },
            input: {
              className: 'rounded text-base',
            },
          }}
        />

        <Field
          form={form}
          name='description'
          type='textarea'
          label='Description'
          placeholder='Description'
          style={{
            label: { className: 'text-base' },
            input: {
              className: 'rounded text-base',
            },
          }}
        />

        <Field
          form={form}
          name='notes'
          type='textarea'
          label='Notes'
          placeholder='Notes'
          style={{
            label: { className: 'text-base' },
            input: {
              className: 'rounded text-base',
            },
          }}
        />

        <Button className='w-full rounded-[5px] shadow' type='submit'>
          Update Ticket
        </Button>
      </form>
    </Form>
  );
}
