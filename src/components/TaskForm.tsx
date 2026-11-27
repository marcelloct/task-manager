import { useActionState } from 'react';
import type { Task } from '../types/task';
import { SubmitButton } from './SubmitButton';

type TaskFormProps = {
  onAdd: (title: string, priority: Task['priority']) => boolean;
};

type TaskFormState = {
  titleError: string | null;
  priorityError: string | null;
  title: string;
  priority: Task['priority'];
};

const initialState: TaskFormState = {
  titleError: null,
  priorityError: null,
  title: '',
  priority: 'medium',
};

// Type guard
function isPriority(
  value: FormDataEntryValue | null
): value is Task['priority'] {
  return value === 'low' || value === 'medium' || value === 'high';
}

export function TaskForm({ onAdd }: TaskFormProps) {
  function addAction(prev: TaskFormState, formData: FormData): TaskFormState {
    const title = String(formData.get('title') ?? '').trim();
    const rawPriority = formData.get('priority');
    const priority = isPriority(rawPriority) ? rawPriority : prev.priority;

    if (!title) {
      return {
        titleError: 'Title is required',
        priorityError: null,
        title,
        priority,
      };
    }

    if (!isPriority(rawPriority)) {
      return { ...prev, priorityError: 'Invalid priority', title };
    }

    const added = onAdd(title, priority);

    if (!added) {
      return {
        titleError: 'This task already exists',
        priorityError: null,
        title,
        priority,
      };
    }

    return { titleError: null, priorityError: null, title: '', priority };
  }

  const [state, formAction] = useActionState(addAction, initialState);

  return (
    <form action={formAction}>
      <input
        name="title"
        type="text"
        defaultValue={state.title}
        placeholder="New Task"
      />
      {state.titleError && <p style={{ color: 'red' }}>{state.titleError}</p>}

      <select name="priority" defaultValue={state.priority}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      {state.priorityError && (
        <p style={{ color: 'red' }}>{state.priorityError}</p>
      )}

      <SubmitButton label="Add" pendingLabel="Adding..." />
    </form>
  );
}
