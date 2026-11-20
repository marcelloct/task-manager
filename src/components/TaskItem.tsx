import { useState, type KeyboardEvent } from 'react';
import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  onEdit: (id: number, newTitle: string) => void;
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

  function startEditing() {
    setDraft(task.title); // always starts from the current title
    setIsEditing(true);
  }

  function save() {
    const trimmed = draft.trim();

    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed);
    }

    setIsEditing(false);
  }

  function cancel() {
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
        </>
      ) : (
        <span
          style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
        >
          {task.title}
        </span>
      )}{' '}
      <span style={{ color: priorityColors[task.priority] }}>
        {task.priority}
      </span>
      <button type="button" onClick={startEditing}>
        📝
      </button>
      <button type="button" onClick={() => onDelete(task.id)}>
        🗑️
      </button>
    </li>
  );
}
