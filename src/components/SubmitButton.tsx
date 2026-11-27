import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  label: string;
  pendingLabel?: string;
};

export function SubmitButton({
  label,
  pendingLabel = 'Sending...',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? pendingLabel : label}
    </button>
  );
}
