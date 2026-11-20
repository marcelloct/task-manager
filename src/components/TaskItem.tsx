import { useState, type KeyboardEvent } from 'react';
import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  onEdit: (id: number, newTitle: string) => boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const priorityColors: Record<Task['priority'], string> = {
  low: 'green',
  medium: 'orange',
  high: 'red',
};

export function TaskItem({ task, onEdit, onToggle, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [error, setError] = useState<string | null>(null);

  function startEditing() {
    setDraft(task.title); // always starts from the current title
    setError(null);
    setIsEditing(true);
  }

  function save() {
    const trimmed = draft.trim();

    // nothing changed: just close
    if (trimmed === task.title) {
      cancel();
      return;
    }

    const saved = onEdit(task.id, trimmed);

    if (!saved) {
      setError('Title is empty or already exists');
      return; // keeps the editor open
    }

    cancel(); // success: closes and clears the error
  }

  function cancel() {
    setError(null);
    setIsEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') save();
    if (e.key === 'Escape') cancel();
  }

  return (
    <li>
      <button type="button" onClick={() => onToggle(task.id)}>
        {task.completed ? '✅' : '⬜'}
      </button>{' '}
      {isEditing ? (
        <>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button type="button" onClick={save}>
            💾
          </button>
          <button type="button" onClick={cancel}>
            ✖️
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      ) : (
        <>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </span>{' '}
          <span style={{ color: priorityColors[task.priority] }}>
            {task.priority}
          </span>
          <button type="button" onClick={startEditing}>
            📝
          </button>
          <button type="button" onClick={() => onDelete(task.id)}>
            🗑️
          </button>
        </>
      )}
    </li>
  );
}
