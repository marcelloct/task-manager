import { RequireAuth } from './components/RequireAuth';
import { TaskManager } from './components/TaskManager';

function App() {
  return (
    <RequireAuth>
      {(user) => <TaskManager key={user.id} user={user} />}
    </RequireAuth>
  );
}

export default App;
