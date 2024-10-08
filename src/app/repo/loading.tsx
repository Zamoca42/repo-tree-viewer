import { TreeSkeletonLoader } from "@/component/loader";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <TreeSkeletonLoader />
      </div>
    </div>
  );
}
