import { useState, type SubmitEvent } from 'react';
import type { Task } from '../types/task';

type TaskFormProps = {
  onAdd: (title: string, priority: Task['priority']) => boolean;
};

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) return;

    const added = onAdd(trimmed, priority);

    if (!added) {
      setError('This task already exists');
      return;
    }

    setError(null);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError(null);
        }}
        placeholder="New Task"
      />
      {error && <p>{error}</p>}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Task['priority'])}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}
