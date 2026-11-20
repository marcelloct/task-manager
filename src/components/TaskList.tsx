import type { Task } from '../types/task';
import { TaskItem } from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onEdit: (id: number, newTitle: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export function TaskList({ tasks, onEdit, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Enjoy your day! 🎉</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
