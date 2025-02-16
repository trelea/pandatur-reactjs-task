import React from 'react';
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';
import { Command as CommandPrimitive } from 'cmdk';
import { FilterType } from '@/features/workflow/types';

type Item = {
  value: string;
  label: string;
};

interface Props {
  data: Item[];
  onSelect: (_: FilterType[]) => void;
  defaultValue: FilterType[];
}

export default function MultiSelect({
  data,
  onSelect,
  defaultValue,
}: Props): React.ReactNode {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Item[]>(
    defaultValue.map((_) => ({ label: _, value: _ }))
  );
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((item: Item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  React.useEffect(() => {
    onSelect(selected.map((_) => _.value) as FilterType[]);
  }, [selected]);

  return (
    <Command
      onKeyDown={handleKeyDown}
      className='overflow-visible bg-transparen border rounded-[5px] px-2 w-80'
    >
      <div className='flex items-center h-full'>
        <div className='flex gap-1 items-center'>
          {selected?.map((item) => (
            <Badge key={item.value} variant='default' className='rounded-[5px]'>
              {item?.label}
              <button
                className='rounded-[3px] outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <X className='h-3 w-3 text-background' />
              </button>
            </Badge>
          ))}
          {selected.length !== data.length && (
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder='Filters.'
              className='outline-none text-sm'
            />
          )}
        </div>
      </div>
      <div className='relative'>
        <CommandList>
          {open && selected.length !== data.length ? (
            <div className='absolute top-0 z-10 w-full border bg-popover text-popover-foreground shadow-md outline-none animate-in rounded-[5px] mt-2'>
              <CommandGroup className='h-full overflow-auto'>
                {data
                  .filter(
                    ({ value }) => !selected.map((_) => _.value).includes(value)
                  )
                  .map((item) => {
                    return (
                      <CommandItem
                        key={item.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          setInputValue('');
                          setSelected((prev) => [...prev, item]);
                        }}
                        className={'cursor-pointer'}
                      >
                        {item.label}
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
