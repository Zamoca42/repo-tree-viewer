import { Skeleton } from "@/component/ui/skeleton";
import { RepoHeader } from "@/component/repo/header";

export function SkeletonTreeLoader() {
  return (
    <div className="space-y-2 pt-11 pb-4 px-4">
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

export default function Loading() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <RepoHeader/>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[50vh] rounded-xl bg-sidebar p-4">
          <SkeletonTreeLoader />
        </div>
      </div>
    </>
  );
}
