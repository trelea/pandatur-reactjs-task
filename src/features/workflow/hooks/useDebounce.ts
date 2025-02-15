import React from 'react';

export const useDebounce = <T>(value: T, ms: number = 1000) => {
  const [data, setData] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setData(value), ms);

    return () => {
      clearTimeout(timer);
    };
  }, [value, ms]);

  return data;
};
