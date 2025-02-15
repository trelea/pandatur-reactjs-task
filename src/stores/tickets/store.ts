import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ITicketsStore, Ticket } from './types';
import { BoardColums } from '@/utils/board-columns';

export const useTicketsStore = create<ITicketsStore>()(
  persist<ITicketsStore>(
    (set, get) => ({
      tickets: [],

      create_ticket: ({
        ticket,
      }: {
        ticket: Omit<Ticket, 'id' | 'priority' | 'workflow'>;
      }) =>
        set({
          tickets: [
            ...get().tickets,
            {
              ...ticket,
              id:
                get().tickets.length === 0
                  ? 0
                  : get().tickets[get().tickets.length - 1].id + 1,
              priority: 0,
              workflow: BoardColums[0].id,
            },
          ],
        }),

      update_ticket: ({
        id,
        ticket,
      }: {
        id: number;
        ticket: Partial<Omit<Ticket, 'id' | 'priority' | 'workflow'>>;
      }) =>
        set({
          tickets: get().tickets.map((t) => {
            if (t.id === id) return { ...t, ...ticket };
            return t;
          }),
        }),

      remove_ticket: ({ id }: { id: number }) =>
        set({
          tickets: get().tickets.filter((ticket) => ticket.id !== id),
        }),

      set_workflow: ({
        ticket,
        workflow,
      }: {
        ticket: number;
        workflow: number;
      }) =>
        set({
          tickets: get().tickets.map((t) => {
            if (t.id === ticket) return { ...t, workflow };
            return t;
          }),
        }),
    }),
    { name: 'kanban' }
  )
);
