import { useState } from 'react';
import { TaskCounter } from './components/TaskCounter';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task } from './types/task';

const initialTasks: Task[] = [
  { id: 1, title: 'Task #1', completed: true, priority: 'high' },
  { id: 2, title: 'Task #2', completed: false, priority: 'low' },
  { id: 3, title: 'Task #3', completed: false, priority: 'medium' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function addTask(title: string, priority: Task['priority']): boolean {
    const exists = tasks.some(
      (task) => task.title.toLowerCase() === title.toLowerCase()
    );

    if (exists) return false;

    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
    };

    setTasks((prev) => [...prev, newTask]);
    return true;
  }

  function editTask(id: number, newTitle: string) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
    );
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }

  const hasCompleted = tasks.some((task) => task.completed);

  return (
    <main>
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskCounter tasks={tasks} />
      <TaskList
        tasks={tasks}
        onEdit={editTask}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
      <button type="button" onClick={clearCompleted} disabled={!hasCompleted}>
        Clear completed
      </button>
    </main>
  );
}

export default App;
