import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // saves on every change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // listens to changes made in OTHER tabs
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key !== key || e.newValue === null) return;

      try {
        setValue(JSON.parse(e.newValue) as T);
      } catch {
        // ignores invalid data
      }
    }

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [value, setValue] as const;
}
