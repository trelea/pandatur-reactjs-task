import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Ticket } from '@/stores/tickets/types';
import { useDraggable } from '@dnd-kit/core';
import {
  GripHorizontal,
  Newspaper,
  NotebookPen,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useControllUpdateDialog } from '../hooks/useControlUpdateDialog';

interface Props {
  ticket: Ticket;
  onTicketDelete: (id: number) => void;
  update: {
    form: (ticket: Ticket, close?: () => void) => React.ReactNode;
  };
}

export default function TicketCard({
  ticket,
  onTicketDelete,
  update: { form },
}: Props): React.ReactNode {
  const { upadte, setUpdate } = useControllUpdateDialog();
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: ticket.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card className='rounded-[10px]' style={style}>
      <div className='flex p-2 gap-2'>
        <div
          {...listeners}
          {...attributes}
          ref={setNodeRef}
          className='hover:bg-gray-200 w-full flex items-center justify-start px-2 py-1 border rounded-[8px]'
        >
          <GripHorizontal className='text-gray-500' />
          <p className='text-gray-500 pl-2'>Click and drag</p>
        </div>
        <Dialog
          open={upadte === ticket.id}
          onOpenChange={(e) => {
            e ? false : setUpdate(null);
          }}
        >
          <DialogTrigger onClick={() => setUpdate(ticket.id)}>
            <div className='border rounded-[8px] flex justify-center items-center hover:bg-gray-200 p-2'>
              <Pencil className='size-4 aspect-square h-4 w-4' />
            </div>
          </DialogTrigger>
          <DialogContent className='rounded-[10px] min-w-2xl'>
            <DialogHeader>
              <DialogTitle>Update Ticket</DialogTitle>
              <DialogDescription>
                Update ticket here. Click save or update when you're done.
              </DialogDescription>
            </DialogHeader>
            {form(ticket, () => setUpdate(null))}
          </DialogContent>
        </Dialog>

        <div
          className='border rounded-[8px] flex justify-center items-center hover:bg-gray-200 p-2'
          onClick={() => onTicketDelete(ticket.id)}
        >
          <Trash2 className='size-4 aspect-square text-destructive h-4 w-4' />
        </div>
      </div>
      <CardHeader className='pt-2'>
        <CardTitle className='text-xl text-gray-800'>{ticket.title}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6 text-gray-600'>
        <div>
          <Newspaper className='float-left size-5 mr-2' />
          <p className='text-balance'>{ticket.description}</p>
        </div>

        <div>
          <NotebookPen className='float-left size-5 mr-2' />
          <p className='text-balance'>{ticket.notes}</p>
        </div>
      </CardContent>
    </Card>
  );
}
