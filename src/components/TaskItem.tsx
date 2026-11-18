import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
};

export function TaskItem({ task }: TaskItemProps) {
  return (
    <li>
      <span>{task.completed ? '✅' : '⬜'}</span>{' '}
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>
    </li>
  );
}
