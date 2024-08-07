import { TreeView } from "@/component/tree-view";
import { TreeViewElement } from "@/component/tree-view-api";
import { getRepoTree } from "@/lib/github";
import { convertToTreeViewElement } from "@/lib/tree-converter";
import { GitTreeResponse } from "@/type";
import { TreeSkeletonLoader } from "@/component/tree-loader";
import { Suspense } from "react";

async function RepoTreeContent({
  name,
  branch,
}: {
  name: string;
  branch: string;
}) {
  let treeData: TreeViewElement[] = [];
  let error: string | null = null;

  try {
    const data: GitTreeResponse = await getRepoTree(name, branch);
    if (!data || !data.tree || !Array.isArray(data.tree)) {
      throw new Error("Invalid repository tree data");
    }
    treeData = convertToTreeViewElement(data.tree);
  } catch (err) {
    console.error("Error fetching repo tree:", err);
    error =
      "Error loading repository data. Please check the repository name and branch.";
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {treeData.length > 0 ? (
        <TreeView elements={treeData} />
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}

export default function RepoPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { branch: string };
}) {
  const { name } = params;
  const { branch } = searchParams;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<TreeSkeletonLoader />}>
        <RepoTreeContent name={name} branch={branch} />
      </Suspense>
    </div>
  );
}
