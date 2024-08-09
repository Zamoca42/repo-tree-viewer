import { cn } from "@/lib/util";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export function TreeSkeletonLoader() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <div className="pl-4 space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pl-4 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-4 w-3/5" />
      </div>
      <Skeleton className="h-4 w-2/3" />
      <div className="pl-4 space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/5" />
      </div>
    </div>
  );
}
