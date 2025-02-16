import React from 'react';
import { IColumn } from '../types';
import { Ticket } from '@/stores/tickets/types';
import { BoardColums } from '@/utils/board-columns';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import ColumnWorklow from './column-workflow';
import { useGetTickets } from '../hooks/useGetTickets';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  columns: IColumn[];
  tickets: Ticket[];
  onTicketDelete: (id: number) => void;
  onPriorityChange: ({
    priority,
    ticket,
  }: {
    priority: number;
    ticket: number;
  }) => void;
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

export default function KanbanBoard({
  columns,
  tickets,
  onTicketDelete,
  onWorkFlowChange,
  onPriorityChange,
  update: { form },
}: Props): React.ReactNode {
  const created = useGetTickets(tickets, BoardColums[0].id);
  const progress = useGetTickets(tickets, BoardColums[1].id);
  const done = useGetTickets(tickets, BoardColums[2].id);

  const handleDragEvent = ({ active, over }: DragEndEvent) => {
    console.log(active, over);

    if (over) {
      const ticket = active.id as number;
      const workflow = over.id as Ticket['workflow'];
      onWorkFlowChange({ ticket, workflow });
    }
  };

  return (
    <ScrollArea className='w-full'>
      <section className='w-full h-full p-6 pt-24'>
        <div className='flex w-full gap-10 justify-between'>
          <DndContext onDragEnd={handleDragEvent}>
            {columns.map((column) => (
              <ColumnWorklow
                key={column.id}
                column={column}
                render={(status, wrapper) => (
                  <>
                    {status === 'CREATED' &&
                      wrapper(created, onTicketDelete, form, onPriorityChange)}
                    {status === 'PROGRESS' &&
                      wrapper(progress, onTicketDelete, form, onPriorityChange)}
                    {status === 'DONE' &&
                      wrapper(done, onTicketDelete, form, onPriorityChange)}
                  </>
                )}
              />
            ))}
          </DndContext>
        </div>
      </section>
    </ScrollArea>
  );
}
