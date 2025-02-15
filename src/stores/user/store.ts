import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserStore } from './types';

export const useUserStore = create<IUserStore>()(
  persist<IUserStore>(
    (set) => ({
      auth: false,
      token: null,
      login: ({ token }: { token: string }) => set({ auth: true, token }),
      logout: (cb?: () => void) => {
        set({ auth: false, token: null });
        cb && cb();
      },
    }),
    {
      name: 'user',
    }
  )
);
