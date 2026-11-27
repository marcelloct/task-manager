import { useActionState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { SubmitButton } from './SubmitButton';

type LoginState = {
  error: string | null;
  name: string;
};

const initialState: LoginState = { error: null, name: '' };

export function LoginForm() {
  const { login } = useAuth();

  function loginAction(_prev: LoginState, formData: FormData): LoginState {
    const name = String(formData.get('name') ?? '');

    const ok = login(name);

    if (!ok) {
      return { error: 'Name must have at least 2 characters', name };
    }

    return { error: null, name: '' };
  }

  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <main>
      <h1>Task Manager</h1>
      <form action={formAction}>
        <label htmlFor="name">Who are you?</label>{' '}
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={state.name}
          placeholder="your name"
          autoFocus
        />{' '}
        <SubmitButton label="Enter" />
        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      </form>
    </main>
  );
}
