import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '@/types/components';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="text-red-500 p-4 text-center">
            <h2>Something went wrong.</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
