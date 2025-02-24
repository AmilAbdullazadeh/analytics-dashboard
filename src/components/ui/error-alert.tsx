import { Alert, AlertDescription } from './alert';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => (
  <Alert variant="destructive" className="mx-4 my-6">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);
