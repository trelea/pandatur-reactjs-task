import React from 'react';
import { Column, IColumn } from '../types';
import { Label } from '@/components/ui/label';
import { Ticket } from '@/stores/tickets/types';
import TicketCard from './ticket-card';
import { useDroppable } from '@dnd-kit/core';

interface Props {
  column: IColumn;
  render: (
    workflow: Column,
    component: (
      tickets: Ticket[],
      onTicketDelete: (id: number) => void,
      form: (ticket: Ticket, cb?: () => void) => React.ReactNode
    ) => React.ReactNode
  ) => React.ReactNode;
}

export default function ColumnWorklow({
  column,
  render,
}: Props): React.ReactNode {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div
      key={column.id}
      className={`border-2 w-full rounded-[10px] min-h-screen shadow-md flex flex-col ${
        column.name === 'CREATED' &&
        'border-blue-600 shadow-blue-600 bg-blue-50'
      } ${
        column.name === 'PROGRESS' &&
        'border-yellow-500 shadow-yellow-500 bg-yellow-50'
      } ${
        column.name === 'DONE' &&
        'border-green-600 shadow-green-600 bg-green-50'
      }`}
    >
      {/* LABEL */}
      <div
        className={`flex w-full justify-center items-center rounded-t py-2 ${
          column.name === 'CREATED' && 'bg-blue-600 '
        } ${column.name === 'PROGRESS' && 'bg-yellow-500 '} ${
          column.name === 'DONE' && 'bg-green-600 '
        }`}
      >
        <Label className='text-background text-xl'>{column.name}</Label>
      </div>

      {/* TICKETS */}
      <div className='p-4 flex flex-col gap-4' ref={setNodeRef}>
        {render(column.name, (tickets, onTicketDelete, form) =>
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onTicketDelete={onTicketDelete}
              update={{
                form,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
