import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores';
import React, { useContext } from 'react';
import AccDropdown from './acc-dropdown';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import SearchBar from './search-bar';
import MultiSelect from '@/components/multi-select';
import { Filters, FilterType } from '../types';
import { decapitalizer } from '@/utils/literals-manipulation';
import {
  WorkflowContext,
  WorkflowContextProps,
} from '@/pages/workflow/context/context';

interface Props {
  create: {
    form: React.ReactNode;
  };
  search: {
    defaultValue?: string;
    onSearch: (_?: string) => void;
  };
  filter: {
    defaultValue?: FilterType[];
    onSelect: (_?: FilterType[]) => void;
  };
}

export default function UtilityBar({
  create: { form },
  search: { defaultValue, onSearch },
  filter: { defaultValue: defaultValueFilter, onSelect },
}: Props): React.ReactNode {
  const { auth, token, logout } = useUserStore();
  const { openCreateDialog, setOpenCreateDialog } =
    useContext<WorkflowContextProps>(WorkflowContext);
  return (
    <nav className='flex justify-center items-center w-full p-4 px-6 border-b shadow-sm fixed z-50 bg-white'>
      <div className='flex justify-between w-full'>
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button className='shadow-xl rounded-[5px] flex items-center'>
              <Plus />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className='rounded-[10px] min-w-2xl'>
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>
                Create new ticket here. Click save or create when you're done.
              </DialogDescription>
            </DialogHeader>
            {form}
          </DialogContent>
        </Dialog>

        <div className='flex items-center gap-2'>
          <SearchBar
            defaultValue={defaultValue as string}
            onSearch={onSearch}
          />
          <MultiSelect
            data={Filters.map((_) => ({
              label: decapitalizer(_, 1, _.length),
              value: _,
            }))}
            defaultValue={defaultValueFilter as FilterType[]}
            onSelect={onSelect}
          />
        </div>

        {auth && token && (
          <AccDropdown
            onLogout={() => logout(() => (window.location.pathname = '/login'))}
          />
        )}
      </div>
    </nav>
  );
}
