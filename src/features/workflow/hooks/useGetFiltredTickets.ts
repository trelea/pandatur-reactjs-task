import { Ticket } from '@/stores/tickets/types';
import { FilterType } from '../types';
import React from 'react';

export const useGetFiltredTickets = ({
  tickets,
  search,
  filters,
}: {
  tickets: Ticket[];
  search: string;
  filters: FilterType[];
}) => {
  const tkts = React.useMemo(() => {
    return tickets.filter((ticket) => {
      if (filters.includes('DESC')) {
        return ticket.description.includes(search);
      }

      if (filters.includes('TITLE')) {
        return ticket.title.includes(search);
      }

      if (filters.includes('NOTES')) {
        return ticket.notes.includes(search);
      }

      return ticket;
    });
  }, [tickets, search, filters]);

  return tkts;
};
