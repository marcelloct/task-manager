import { createContext } from 'react';

export type User = {
  id: string;
  name: string;
};

export type AuthContextValue = {
  user: User | null;
  login: (name: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
