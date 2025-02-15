import { parseAsInteger, useQueryState } from 'nuqs';

export const useControllUpdateDialog = () => {
  const [upadte, setUpdate] = useQueryState('update', parseAsInteger);

  return { upadte, setUpdate };
};
