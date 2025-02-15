import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores';
import React from 'react';
import AccDropdown from './acc-dropdown';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Props {
  create: {
    form: React.ReactNode;
  };
}

export default function UtilityBar({
  create: { form },
}: Props): React.ReactNode {
  const { auth, token, logout } = useUserStore();
  return (
    <nav className='flex justify-center items-center w-full p-4 px-6 border-b shadow-sm'>
      <div className='flex justify-between w-full'>
        <Dialog>
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

        <div className='border flex items-center justify-between rounded-[5px] px-2 py-1 h-fit'>
          <Search className='size-5 aspect-square' />
          <Input
            className='border-none outline-none ring-0 shadow-none drop-shadow-none focus-visible:ring-0 h-fit w-96'
            placeholder='Search tickets'
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
