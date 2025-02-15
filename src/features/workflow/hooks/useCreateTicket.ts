import {
  WorkflowContext,
  WorkflowContextProps,
} from '@/pages/workflow/context/context';
import { useTicketsStore } from '@/stores';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formModel = z.object({
  title: z.string(),
  description: z.string(),
  notes: z.string(),
});

export const useCreateTicket = () => {
  const { setOpenCreateDialog } =
    useContext<WorkflowContextProps>(WorkflowContext);

  const { create_ticket } = useTicketsStore();

  const form = useForm<z.infer<typeof formModel>>({
    resolver: zodResolver(formModel),
    defaultValues: {
      title: undefined,
      description: undefined,
      notes: undefined,
    },
  });

  const onSubmit = (val: z.infer<typeof formModel>) => {
    try {
      create_ticket({ ticket: val });
      setOpenCreateDialog(false);
      toast('Ticket Created Successfully.');
    } catch (err: unknown) {
      return toast('Error Creating Ticket');
    }
  };

  return { form, onSubmit };
};
