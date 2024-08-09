import { TreeView } from "@/component/tree-view";
import { decodeTreeViewElement } from "@/lib/converter";
import { TreeViewElement } from "@/component/tree-view-api";

type RepoTreeContentProps = {
  treeData: string | TreeViewElement[];
  repoName?: string;
  branch?: string;
};

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

  if (typeof treeData === "string") {
    try {
      decodedData = decodeTreeViewElement(treeData);
    } catch (error) {
      console.error("Error decoding repo context:", error);
      return <div>Error loading repository data. Please try again later.</div>;
    }
  } else {
    decodedData = {
      repoName: repoName || "Unknown Repository",
      branch: branch || "Unknown Branch",
      treeData: treeData,
    };
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
