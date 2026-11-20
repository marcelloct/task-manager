import { useState, type KeyboardEvent } from 'react';
import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  onEdit: (id: number, newTitle: string) => boolean;
  onChangePriority: (id: number, updatedPriority: Task['priority']) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const priorityColors: Record<Task['priority'], string> = {
  low: 'green',
  medium: 'orange',
  high: 'red',
};

export function TaskItem({
  task,
  onEdit,
  onChangePriority,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [draftPriority, setDraftPriority] = useState(task.priority);
  const [error, setError] = useState<string | null>(null);

  function startEditing() {
    setDraft(task.title); // always starts from the current title
    setDraftPriority(task.priority);
    setError(null);
    setIsEditing(true);
  }

  function save() {
    const trimmed = draft.trim();
    const titleChanged = trimmed !== task.title;
    const priorityChanged = draftPriority !== task.priority;

    if (titleChanged) {
      const saved = onEdit(task.id, trimmed);

      if (!saved) {
        setError('Title is empty or already exists');
        return; // stops here: priority is NOT saved, keeps the editor open
      }
    }

    if (priorityChanged) {
      onChangePriority(task.id, draftPriority);
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
            onChange={(e) => {
              setDraft(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <select
            value={draftPriority}
            onChange={(e) =>
              setDraftPriority(e.target.value as Task['priority'])
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

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
