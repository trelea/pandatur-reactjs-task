export interface Ticket {
  id: number;
  priority: number;
  workflow: number;
  title: string;
  description: string;
  notes: string;
}

export interface ITicketsStore {
  ticktes: Ticket[] | [];

  create_ticket: () => void;
  remove_ticket: ({ id }: { id: number }) => void;
}
