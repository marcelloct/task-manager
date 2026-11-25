import type { ReactNode } from 'react';
import type { User } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm';

type RequireAuthProps = {
  children: (user: User) => ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useAuth();

  if (!user) return <LoginForm />;

  return <>{children(user)}</>;
}
