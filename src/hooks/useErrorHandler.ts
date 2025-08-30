import { useState, useCallback } from 'react';

// Type for error handling state
export interface ErrorState {
  hasError: boolean;
  message: string | null;
  code?: string | number;
  retry?: () => void;
}

// Custom hook for error handling
const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    message: null,
  });

  // Function to handle errors
  const handleError = useCallback((error: unknown, retryFn?: () => void) => {
    if (error instanceof Error) {
      setErrorState({
        hasError: true,
        message: error.message,
        retry: retryFn,
      });
    } else if (typeof error === 'string') {
      setErrorState({
        hasError: true,
        message: error,
        retry: retryFn,
      });
    } else {
      setErrorState({
        hasError: true,
        message: 'An unknown error occurred',
        retry: retryFn,
      });
    }
  }, []);

  // Function to clear errors
  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      message: null,
    });
  }, []);

  return {
    errorState,
    handleError,
    clearError,
  };
};

export default useErrorHandler;