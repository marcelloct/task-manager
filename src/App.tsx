import { LoginForm } from './components/LoginForm';
import { TaskManager } from './components/TaskManager';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  if (!user) return <LoginForm />;

  return <TaskManager key={user.id} user={user} />;
}

export default App;
