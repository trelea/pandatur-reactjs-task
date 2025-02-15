import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ITicketsStore } from './types';

export const useTicketsStore = create<ITicketsStore>()(
  persist<ITicketsStore>(
    (set, get) => ({
      ticktes: [],

      create_ticket: () => set({}),

      remove_ticket: ({ id }: { id: number }) =>
        set({
          ticktes: get().ticktes.filter((ticket) => ticket.id !== id),
        }),
    }),
    { name: 'kanban' }
  )
);
