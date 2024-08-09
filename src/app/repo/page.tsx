import { RepoTreeContent } from "@/component/content";
import { TreeSkeletonLoader } from "@/component/loader";
import { TreeViewElement } from "@/component/tree-view-api";
import { buildTreeStructure } from "@/lib/converter";
import { getRepoTree } from "@/lib/github";
import { Suspense } from "react";

async function getTreeData(
  name: string,
  branch: string
): Promise<TreeViewElement[]> {
  const treeData = await getRepoTree(name, branch);

  if (!treeData || !treeData.tree) {
    throw new Error(`Empty tree data for repository: ${name}`);
  }

  return buildTreeStructure(treeData.tree);
}

export default async function RepoPage({
  searchParams,
}: {
  searchParams: { t?: string; n?: string; b?: string };
}) {
  const { t: tree, n: name, b: branch } = searchParams;

  let treeData: string | TreeViewElement[] | undefined = tree;

  if (name && branch && !tree) {
    try {
      treeData = await getTreeData(name, branch);
    } catch (error) {
      console.error("Error fetching repo tree:", error);
      return <div>Error loading repository data. Please try again later.</div>;
    }
  }

  if (!treeData) {
    return <div>No tree data available. Please provide valid parameters.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Suspense fallback={<TreeSkeletonLoader />}>
        <RepoTreeContent treeData={treeData} repoName={name} branch={branch} />
      </Suspense>
    </div>
  );
}
