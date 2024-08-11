"use client";

import { TreeView } from "@/component/tree-view";
import { decodeTreeViewElement } from "@/lib/converter";
import { TreeViewElement } from "@/component/tree-view-api";

type RepoTreeContentProps = {
  treeData: string | TreeViewElement[];
  repoName?: string;
  branch?: string;
};

export const CenteredMessage = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {children}
    </div>
  </div>
);

export function RepoTreeContent({
  treeData,
  repoName,
  branch,
}: RepoTreeContentProps) {
  let decodedData: {
    repoName: string;
    branch: string;
    treeData: TreeViewElement[];
  };

  try {
    if (typeof treeData === "string") {
      decodedData = decodeTreeViewElement(treeData);
    } else {
      decodedData = {
        repoName: repoName || "Unknown Repository",
        branch: branch || "Unknown Branch",
        treeData: treeData,
      };
    }
  } catch (error) {
    console.error("Error decoding repo context:", error);
    return <div>Error loading repository data. Please try again later.</div>;
  }

  const {
    repoName: decodedRepoName,
    branch: decodedBranch,
    treeData: elements,
  } = decodedData;

  return (
    <>
      {elements && elements.length > 0 ? (
        <TreeView elements={elements} />
      ) : (
        <div>
          No data available for {decodedRepoName} ({decodedBranch})
        </div>
      )}
    </>
  );
}
