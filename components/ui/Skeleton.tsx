export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-surface-container-lowest p-6 shadow-sm">
      <Skeleton className="mb-4 h-12 w-12 rounded-full" />
      <Skeleton className="mb-2 h-4 w-24" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
      <Skeleton className="mb-3 h-10 w-10 rounded-lg" />
      <Skeleton className="mb-2 h-3 w-20" />
      <Skeleton className="h-6 w-12" />
    </div>
  );
}

export function SkeletonNewsCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="mb-3 h-4 w-16" />
        <Skeleton className="mb-3 h-6 w-full" />
        <Skeleton className="mb-4 h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
      <div className="p-6">
        <Skeleton className="mb-4 h-6 w-48" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
