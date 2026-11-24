import type { TaskFilter } from '../types/task';

type TaskFiltersProps = {
  filter: TaskFilter;
  counts: Record<TaskFilter, number>;
  onChange: (filter: TaskFilter) => void;
};

const filterOptions: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TaskFilters({ filter, counts, onChange }: TaskFiltersProps) {
  return (
    <div>
      {filterOptions.map(({ value, label }) => (
        <button
          type="button"
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={filter === value}
          style={{ fontWeight: filter === value ? 'bold' : 'normal' }}
        >
          {label} ({counts[value]})
        </button>
      ))}
    </div>
  );
}
