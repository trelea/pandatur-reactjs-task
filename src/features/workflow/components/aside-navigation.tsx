import React from 'react';
import {
  AlarmClockPlus,
  Calendar,
  Home,
  Bell,
  Heart,
  Search,
  ShoppingCart,
} from 'lucide-react';

const items: { label: string; icon: React.ReactNode }[] = [
  {
    label: 'Clocks',
    icon: <AlarmClockPlus className='size-6' />,
  },
  {
    label: 'Calendar',
    icon: <Calendar className='size-6' />,
  },
  {
    label: 'Home',
    icon: <Home className='size-6' />,
  },
  {
    label: 'Notifications',
    icon: <Bell className='size-6' />,
  },
  {
    label: 'Favorites',
    icon: <Heart className='size-6' />,
  },
  {
    label: 'Search',
    icon: <Search className='size-6' />,
  },
  {
    label: 'Cart',
    icon: <ShoppingCart className='size-6' />,
  },
] as const;

export default function AsideNavigation(): React.ReactNode {
  return (
    <aside className='h-full border-r shadow-sm p-6 pr-20 pt-24'>
      <div className='flex flex-col justify-center gap-8'>
        {items.map(({ label, icon }) => (
          <div className='flex items-center justify-start gap-4 text-gray-800'>
            {icon}
            <h1 className='font-medium text-gray-500 text-base hover:text-gray-800'>
              {label}
            </h1>
          </div>
        ))}
      </div>
    </aside>
  );
}
