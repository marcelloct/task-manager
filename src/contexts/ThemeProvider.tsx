import { useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeContext, type Theme } from './ThemeContext';

type ThemeProviderProps = {
  children: ReactNode;
};

function getInitialTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme:dark)').matches
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<Theme>(
    'task-manager:theme:v1',
    getInitialTheme()
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
