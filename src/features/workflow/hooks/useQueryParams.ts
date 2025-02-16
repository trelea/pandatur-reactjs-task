import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';
import { Filters } from '../types';

export const useQueryParams = () => {
  const [queries, setQueries] = useQueryStates({
    search: parseAsString.withDefault(''),
    filters: parseAsArrayOf(parseAsStringLiteral(Filters)).withDefault([
      Filters[0],
    ]),
  });
  const clear = () => setQueries({ search: '', filters: ['TITLE'] });

  return { queries, setQueries, clear };
};
