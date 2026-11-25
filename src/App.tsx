import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { TaskCounter } from './components/TaskCounter';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { ThemeToggle } from './components/ThemeToggle';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, TaskFilter } from './types/task';

const initialTasks: Task[] = [
  { id: 1, title: 'Task #1', completed: true, priority: 'high' },
  { id: 2, title: 'Task #2', completed: false, priority: 'low' },
  { id: 3, title: 'Task #3', completed: false, priority: 'medium' },
];

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    'task-manager:tasks:v1',
    initialTasks
  );
  const [filter, setFilter] = useLocalStorage<TaskFilter>(
    'task-manager:filter:v1',
    'all'
  );
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();

  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);
    const matchesSearch = task.title.toLowerCase().includes(normalizedSearch);

    return matchesFilter && matchesSearch;
  });

  function titleExists(title: string, ignoreId?: number): boolean {
    const normalized = title.trim().toLowerCase();

    return tasks.some(
      (task) => task.id !== ignoreId && task.title.toLowerCase() === normalized
    );
  }

  function addTask(title: string, priority: Task['priority']): boolean {
    const trimmed = title.trim();

    if (!trimmed || titleExists(trimmed)) return false;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      completed: false,
      priority,
    };

    setTasks((prev) => [...prev, newTask]);
    return true;
  }

  function editTask(id: number, newTitle: string): boolean {
    const trimmed = newTitle.trim();
    if (!trimmed || titleExists(trimmed, id)) return false;

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title: trimmed } : task))
    );

    return true;
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

  function changePriority(id: number, updatedPriority: Task['priority']) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority: updatedPriority } : task
      )
    );
  }

  const emptyMessage =
    tasks.length === 0
      ? 'No tasks yet. Enjoy your day! 🎉'
      : 'No tasks match your filters.';

  const counts: Record<TaskFilter, number> = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <main>
      <h1>
        Task Manager <ThemeToggle />
      </h1>
      <TaskForm onAdd={addTask} />
      <SearchBar value={search} onChange={setSearch} />
      <TaskFilters filter={filter} onChange={setFilter} counts={counts} />
      <TaskCounter tasks={tasks} />
      <TaskList
        tasks={visibleTasks}
        emptyMessage={emptyMessage}
        onEdit={editTask}
        onChangePriority={changePriority}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
      {(filter === 'all' || filter === 'completed') && (
        <button type="button" onClick={clearCompleted} disabled={!hasCompleted}>
          Clear completed
        </button>
      )}
    </main>
  );
}

export default App;
