import KanbanBoard from '@/features/workflow/components/kanban-board';
import UtilityBar from '@/features/workflow/components/utility-bar';
import CreateTicketForm from '@/features/workflow/forms/create-ticket';
import { useQueryParams } from '@/features/workflow/hooks/useQueryParams';
import { useTicketsStore } from '@/stores';
import { BoardColums } from '@/utils/board-columns';
import React from 'react';
import WorkflowLayout from './context/context';
import UpdateTicketForm from '@/features/workflow/forms/update-ticket';

export default function Workflow(): React.ReactNode {
  const {
    queries: { search, filters },
    setQueries,
  } = useQueryParams();
  const { tickets, remove_ticket, set_workflow } = useTicketsStore();

  return (
    <WorkflowLayout>
      <UtilityBar
        create={{ form: <CreateTicketForm className='flex flex-col gap-6' /> }}
        search={{
          defaultValue: search,
          onSearch: (search) => setQueries({ search, filters }),
        }}
        filter={{
          defaultValue: filters,
          onSelect: (filters) => setQueries({ search, filters }),
        }}
      />
      <KanbanBoard
        columns={BoardColums}
        tickets={tickets}
        onTicketDelete={(id) => remove_ticket({ id })}
        onWorkFlowChange={set_workflow}
        update={{
          form: (ticket, close) => (
            <UpdateTicketForm
              ticket={ticket}
              cb={close}
              className='flex flex-col gap-6'
            />
          ),
        }}
      />
    </WorkflowLayout>
  );
}
