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
      form: (ticket: Ticket, cb?: () => void) => React.ReactNode,
      onPriorityChange?: ({
        priority,
        ticket,
      }: {
        priority: number;
        ticket: number;
      }) => void
    ) => React.ReactNode
  ) => React.ReactNode;
}

export default function ColumnWorklow({
  column,
  render,
}: Props): React.ReactNode {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'COLUMN' },
  });
  return (
    <div
      ref={setNodeRef}
      key={column.id}
      className={`border-2 w-full rounded-[10px] h-full shadow-md flex flex-col ${
        column.name === 'CREATED' &&
        `border-blue-600 shadow-blue-600 bg-blue-50 ${isOver && 'shadow-xl'}`
      } ${
        column.name === 'PROGRESS' &&
        `border-yellow-500 shadow-yellow-500 bg-yellow-50 ${
          isOver && 'shadow-xl'
        }`
      } ${
        column.name === 'DONE' &&
        `border-green-600 shadow-green-600 bg-green-50 ${isOver && 'shadow-xl'}`
      } `}
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
      <div className={`p-4 flex flex-col gap-4 `}>
        {render(
          column.name,
          (tickets, onTicketDelete, form, onPriorityChange) =>
            tickets.length === 0 ? (
              <div
                className={`flex justify-center items-center p-20 font-medium text-xl ${
                  column.name === 'CREATED' && 'text-blue-600 '
                } ${column.name === 'PROGRESS' && 'text-yellow-500 '} ${
                  column.name === 'DONE' && 'text-green-600 '
                }`}
              >
                <h1>No Tickets Found.</h1>
              </div>
            ) : (
              tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onTicketDelete={onTicketDelete}
                  onPriorityChange={onPriorityChange}
                  update={{
                    form,
                  }}
                />
              ))
            )
        )}
      </div>
    </div>
  );
}
