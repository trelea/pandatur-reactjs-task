import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Code,
  Github,
  HeartHandshake,
  LogOut,
  Settings,
  User,
  UserPen,
} from 'lucide-react';

interface Props {
  onLogout: () => void;
}

export default function AccDropdown({ onLogout }: Props): React.ReactNode {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='bg-primary rounded-full shadow-xl p-2 hover:bg-primary/50'
      >
        <User className='text-background size-8' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-64 mr-4 rounded-[5px]'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='flex items-center gap-2'>
            <UserPen />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <Github />
            GitHub
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2'>
            <HeartHandshake />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem className='flex items-center gap-2' disabled>
            <Code />
            API
          </DropdownMenuItem>
          <DropdownMenuItem
            className='flex items-center gap-2 text-destructive'
            onClick={onLogout}
          >
            <LogOut className='text-destructive' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
