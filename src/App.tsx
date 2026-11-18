import type { Task } from './types/task';
import { TaskList } from './components/TaskList';

const initialTasks: Task[] = [
  { id: 1, title: 'Task #1', completed: true },
  { id: 2, title: 'Task #2', completed: false },
  { id: 3, title: 'Task #3', completed: false },
];

function App() {
  return (
    <main>
      <h1>Task Manager</h1>
      <TaskList tasks={initialTasks} />
    </main>
  );
}

export default App;
