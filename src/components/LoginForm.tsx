import { useState, type SyntheticEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const ok = login(name);

    if (!ok) {
      setError('Name must have at least 2 characters');
    }
  }

  return (
    <main>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Who are you?</label>{' '}
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          placeholder="your name"
          autoFocus
        />{' '}
        <button type="submit">Enter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </main>
  );
}
