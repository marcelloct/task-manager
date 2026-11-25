import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AuthContext, type User } from './AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useLocalStorage<User | null>(
    'task-manager:user:v1',
    null
  );

  function login(name: string): boolean {
    const trimmed = name.trim();

    if (trimmed.length < 2) return false;

    setUser({ id: trimmed.toLowerCase(), name: trimmed });
    return true;
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}
