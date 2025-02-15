export const Filters = ['TITLE', 'DESC', 'NOTES'] as const;
export type FilterType = (typeof Filters)[number];

export const Columns = ['CREATED', 'PROGRESS', 'DONE'] as const;
export type Column = (typeof Columns)[number];

export interface IColumn {
  id: number;
  name: Column;
}
