export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 rounded-md mb-4"></div>

      {/* Content skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
