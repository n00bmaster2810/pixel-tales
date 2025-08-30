import { getErrorMessage } from '../utils/errorUtils';

interface AlbumErrorFallbackProps {
  error: unknown;
  resetErrorBoundary?: () => void;
}

const AlbumErrorFallback = ({ error, resetErrorBoundary }: AlbumErrorFallbackProps) => {
  const errorMessage = getErrorMessage(error);
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-danger p-6 rounded-md bg-danger/5 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-3">Unable to load albums</h2>
        <p className="text-sm opacity-80 mb-4">
          {errorMessage}
        </p>
        {resetErrorBoundary && (
          <button 
            onClick={resetErrorBoundary}
            className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-md text-sm transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

export default AlbumErrorFallback;