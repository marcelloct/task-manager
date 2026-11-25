import { useState } from 'react';
import type { User } from '../contexts/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Task, TaskFilter } from '../types/task';
import { SearchBar } from './SearchBar';
import { TaskCounter } from './TaskCounter';
import { TaskFilters } from './TaskFilters';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { ThemeToggle } from './ThemeToggle';

type TaskManagerProps = {
  user: User;
};

export function TaskManager({ user }: TaskManagerProps) {
  const { logout } = useAuth();

  const [tasks, setTasks] = useLocalStorage<Task[]>(
    `task-manager:tasks:${user.id}:v1`,
    []
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
      <header>
        <h1>Task Manager</h1>
        <span style={{ textTransform: 'capitalize' }}>
          Hello, {user.name}!
        </span>{' '}
        <button type="button" onClick={logout}>
          Logout
        </button>
        <ThemeToggle />
      </header>
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
