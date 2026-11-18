import type { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
};

const priorityColors: Record<Task['priority'], string> = {
  low: 'green',
  medium: 'orange',
  high: 'red',
};

export function TaskItem({ task }: TaskItemProps) {
  return (
    <li>
      <span>{task.completed ? '✅' : '⬜'}</span>{' '}
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>{' '}
      <span style={{ color: priorityColors[task.priority] }}>
        {task.priority}
      </span>
    </li>
  );
}
