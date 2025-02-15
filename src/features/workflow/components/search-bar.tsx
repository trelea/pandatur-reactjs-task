import React from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Props {
  defaultValue: string;
  onSearch: (_?: string) => void;
}

export default function SearchBar({
  defaultValue,
  onSearch,
}: Props): React.ReactNode {
  const [search, setSearch] = React.useState<string>(defaultValue);
  const value = useDebounce(search, 500);

  React.useEffect(() => {
    onSearch(value);
  }, [value]);

  return (
    <div className='border flex items-center justify-between rounded-[5px] px-2 py-1 h-fit'>
      <Search className='size-5 aspect-square' />
      <Input
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border-none outline-none ring-0 shadow-none drop-shadow-none focus-visible:ring-0 h-fit w-96'
        placeholder='Search tickets'
      />
    </div>
  );
}
