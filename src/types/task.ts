export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
};

export type TaskFilter = 'all' | 'active' | 'completed';
