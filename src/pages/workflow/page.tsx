import KanbanBoard from '@/features/workflow/components/kanban-board';
import UtilityBar from '@/features/workflow/components/utility-bar';
import CreateTicketForm from '@/features/workflow/forms/create-ticket';
import { useQueryParams } from '@/features/workflow/hooks/useQueryParams';
import { useTicketsStore } from '@/stores';
import { BoardColums } from '@/utils/board-columns';
import React from 'react';
import WorkflowLayout from './context/context';
import UpdateTicketForm from '@/features/workflow/forms/update-ticket';
import AsideNavigation from '@/features/workflow/components/aside-navigation';
import { useGetFiltredTickets } from '@/features/workflow/hooks/useGetFiltredTickets';

export default function Workflow(): React.ReactNode {
  const {
    queries: { search, filters },
    setQueries,
    clear,
  } = useQueryParams();
  const { tickets, remove_ticket, set_workflow, set_priority } =
    useTicketsStore();
  const filtredTickets = useGetFiltredTickets({ tickets, search, filters });

  return (
    <WorkflowLayout className='h-lvh'>
      <UtilityBar
        create={{
          form: <CreateTicketForm className='flex flex-col gap-6' cb={clear} />,
        }}
        search={{
          defaultValue: search,
          onSearch: (search) => setQueries({ search, filters }),
        }}
        filter={{
          defaultValue: filters,
          onSelect: (filters) => setQueries({ search, filters }),
        }}
      />
      <div className='flex h-full'>
        <AsideNavigation />
        <KanbanBoard
          columns={BoardColums}
          tickets={filtredTickets}
          onTicketDelete={(id) => remove_ticket({ id })}
          onPriorityChange={set_priority}
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
      </div>
    </WorkflowLayout>
  );
}
