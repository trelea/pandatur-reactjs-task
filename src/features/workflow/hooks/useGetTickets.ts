import { Ticket } from '@/stores/tickets/types';
import React from 'react';

export const useGetTickets = (tickets: Ticket[], id: number) => {
  const tkts = React.useMemo(
    () =>
      tickets
        .filter((ticket) => ticket.workflow === id)
        .sort((a, b) => b.priority - a.priority),
    [tickets]
  );

  return tkts;
};
