import {
  WorkflowContext,
  WorkflowContextProps,
} from '@/pages/workflow/context/context';
import { useTicketsStore } from '@/stores';
import { Ticket } from '@/stores/tickets/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formModel = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

export const useUpdateTicket = ({
  ticket,
  cb,
}: {
  ticket: Ticket;
  cb?: () => void;
}) => {
  const { setOpenUpdateDialog } =
    useContext<WorkflowContextProps>(WorkflowContext);

  const { update_ticket } = useTicketsStore();

  const form = useForm<z.infer<typeof formModel>>({
    resolver: zodResolver(formModel),
    defaultValues: {
      title: ticket.title,
      description: ticket.description,
      notes: ticket.notes,
    },
  });

  const onSubmit = (val: z.infer<typeof formModel>) => {
    try {
      update_ticket({ ticket: val, id: ticket.id });
      setOpenUpdateDialog(false);
      toast('Ticket Updated Successfully.');
      cb && cb();
    } catch (err: unknown) {
      return toast('Error Creating Ticket');
    }
  };

  return { form, onSubmit };
};
