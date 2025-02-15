import React from 'react';
import { IColumn } from '../types';
import { Ticket } from '@/stores/tickets/types';
import { BoardColums } from '@/utils/board-columns';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import ColumnWorklow from './column-workflow';

interface Props {
  columns: IColumn[];
  tickets: Ticket[];
  onTicketDelete: (id: number) => void;
  onWorkFlowChange: ({
    ticket,
    workflow,
  }: {
    ticket: number;
    workflow: number;
  }) => void;
  update: {
    form: (ticket: Ticket, cb?: () => void) => React.ReactNode;
  };
}

const filterTickets = (tickets: Ticket[], id: number) =>
  tickets
    .filter((ticket) => ticket.workflow === id)
    .sort((a, b) => b.priority - a.priority);

export default function KanbanBoard({
  columns,
  tickets,
  onTicketDelete,
  onWorkFlowChange,
  update: { form },
}: Props): React.ReactNode {
  const created = React.useMemo(
    () => filterTickets(tickets, BoardColums[0].id),
    [tickets]
  );
  const progress = React.useMemo(
    () => filterTickets(tickets, BoardColums[1].id),
    [tickets]
  );
  const done = React.useMemo(
    () => filterTickets(tickets, BoardColums[2].id),
    [tickets]
  );

  const handleDragEvent = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const ticket = active.id as number;
    const workflow = over.id as Ticket['workflow'];
    onWorkFlowChange({ ticket, workflow });
  };

  return (
    <section className='w-full p-6'>
      <div className='flex w-full gap-10 justify-between'>
        <DndContext onDragEnd={handleDragEvent}>
          {columns.map((column) => (
            <ColumnWorklow
              key={column.id}
              column={column}
              render={(status, wrapper) => (
                <>
                  {status === 'CREATED' &&
                    wrapper(created, onTicketDelete, form)}
                  {status === 'PROGRESS' &&
                    wrapper(progress, onTicketDelete, form)}
                  {status === 'DONE' && wrapper(done, onTicketDelete, form)}
                </>
              )}
            />
          ))}
        </DndContext>
      </div>
    </section>
  );
}
