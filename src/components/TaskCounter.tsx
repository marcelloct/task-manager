import type { Task } from '../types/task';

type TaskCounterProps = {
  tasks: Task[];
};

export function TaskCounter({ tasks }: TaskCounterProps) {
  const completedCount = tasks.filter((task) => task.completed).length;
  return (
    <p>
      {completedCount} of {tasks.length} completed
    </p>
  );
}
