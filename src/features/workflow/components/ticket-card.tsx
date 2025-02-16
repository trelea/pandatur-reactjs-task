import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Gauge,
  GripHorizontal,
  Newspaper,
  NotebookPen,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { useControllUpdateDialog } from '../hooks/useControlUpdateDialog';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  ticket: Ticket;
  onTicketDelete: (id: number) => void;
  onPriorityChange?: ({
    priority,
    ticket,
  }: {
    priority: number;
    ticket: number;
  }) => void;
  update: {
    form: (ticket: Ticket, close?: () => void) => React.ReactNode;
  };
}

export default function TicketCard({
  ticket,
  onTicketDelete,
  onPriorityChange,
  update: { form },
}: Props): React.ReactNode {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  // const [positions, setPositions] = React.useState<{ x: number; y: number }>();
  const { upadte, setUpdate } = useControllUpdateDialog();
  const { attributes, listeners, transform, setNodeRef, isDragging } =
    useDraggable({
      id: ticket.id,
      data: {
        type: 'TICKET',
        workflow: ticket.workflow,
        priority: ticket.priority,
      },
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  // React.useEffect(() => {
  //   const handleMovements = ({
  //     screenX,
  //     screenY,
  //   }: {
  //     screenX: number;
  //     screenY: number;
  //   }) => {
  //     setPositions({ x: screenX, y: screenY });
  //   };

  //   if (isDragging) window.addEventListener('mousemove', handleMovements);

  //   // return () => {
  //   //   window.removeEventListener('mousemove', handleMovements);
  //   // };
  // }, [isDragging]);

  return (
    <Card
      ref={divRef}
      className={`rounded-[10px] ${isDragging && `border-3 shadow-2xl`}`}
      style={style}
    >
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
      <CardFooter>
        <div className='flex gap-2 items-center'>
          <Gauge className='float-left size-5 mr-2' />
          <form
            className='flex items-center gap-2 h-fit'
            onSubmit={(e) => {
              e.preventDefault();
              // @ts-ignore
              const priority = Number(new FormData(e.target).get('priority'));
              onPriorityChange &&
                onPriorityChange({ priority, ticket: ticket.id });
            }}
          >
            <Input
              name='priority'
              defaultValue={ticket.priority}
              placeholder='Priority...'
              type='number'
              className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none ring-0 focus-visible:ring-0 rounded-[5px] h-fit w-24 m-0 p-1 border-gray-300'
            />
            <Button
              variant={'outline'}
              className='m-0 p-0 rounded-[5px] h-7 border-gray-300'
              type={'submit'}
            >
              Apply <Plus className='aspect-square' />
            </Button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}
