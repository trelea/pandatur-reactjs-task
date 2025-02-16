export interface Ticket {
  id: number;
  priority: number;
  workflow: number;
  title: string;
  description: string;
  notes: string;
}

export interface ITicketsStore {
  tickets: Ticket[] | [];

  create_ticket: ({
    ticket,
  }: {
    ticket: Omit<Ticket, 'id' | 'priority' | 'workflow'>;
  }) => void;

  update_ticket: ({
    id,
    ticket,
  }: {
    id: number;
    ticket: Partial<Omit<Ticket, 'id' | 'priority' | 'workflow'>>;
  }) => void;

  remove_ticket: ({ id }: { id: number }) => void;

  set_workflow: ({
    ticket,
    workflow,
  }: {
    ticket: number;
    workflow: number;
  }) => void;

  set_priority: ({
    ticket,
    priority,
  }: {
    ticket: number;
    priority: number;
  }) => void;
}
