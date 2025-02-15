export interface IUserStore {
  auth: boolean;
  token: string | null;

  login: ({ token }: { token: string }) => void;
  logout: (cb?: () => void) => void;
}
