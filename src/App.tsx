import { TaskCounter } from './components/TaskCounter';
import { TaskList } from './components/TaskList';
import type { Task } from './types/task';

const initialTasks: Task[] = [
  { id: 1, title: 'Task #1', completed: true, priority: 'high' },
  { id: 2, title: 'Task #2', completed: false, priority: 'low' },
  { id: 3, title: 'Task #3', completed: false, priority: 'medium' },
];

function App() {
  return (
    <main>
      <h1>Task Manager</h1>
      <TaskList tasks={initialTasks} />
      <TaskCounter tasks={initialTasks} />
    </main>
  );
}

export default App;
