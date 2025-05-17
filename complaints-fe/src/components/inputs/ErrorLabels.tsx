import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from 'react-hook-form';

type InputErrorMessageProps = {
  message:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldValues>>
    | undefined;
  className?: string;
};

export const InputErrorMessage = ({
  message,
  className,
}: InputErrorMessageProps) => {
  if (!message) return null;
  return (
    <p className={`text-red-500 text-[13px] ${className}`}>{String(message)}</p>
  );
};
