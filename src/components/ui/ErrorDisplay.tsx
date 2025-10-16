interface ErrorDisplayProps {
  title?: string;
  message: string;
  action?: React.ReactNode;
}

export default function ErrorDisplay({ 
  title = "Something went wrong", 
  message,
  action
}: ErrorDisplayProps) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center py-12">
        <div className="text-red-400 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">{title}</h1>
        <div className="max-w-2xl mx-auto">
          <pre className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md overflow-auto text-sm text-left">
            {message}
          </pre>
        </div>
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}