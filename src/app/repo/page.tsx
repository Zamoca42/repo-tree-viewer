import { TreeView } from "@/component/tree-view";
import { decodeTreeViewElement } from "@/lib/converter";
import { TreeSkeletonLoader } from "@/component/tree-loader";
import { Suspense } from "react";

async function RepoTreeContent({ tree }: { tree: string }) {
  try {
    const { repoName, branch, treeData } = decodeTreeViewElement(tree);

    return (
      <>
        {treeData && treeData.length > 0 ? (
          <TreeView elements={treeData} />
        ) : (
          <div>
            No data available for {repoName} ({branch})
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error("Error decoding repo context:", error);
    return <div>Error loading repository data. Please try again later.</div>;
  }
}

export default function RepoPage({
  searchParams,
}: {
  searchParams: { tree: string };
}) {
  const { tree } = searchParams;

  if (!tree) {
    return <div>No repository context provided</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<TreeSkeletonLoader />}>
        <RepoTreeContent tree={tree} />
      </Suspense>
    </div>
  );
}
