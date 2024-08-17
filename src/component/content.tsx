import { TreeView } from "@/component/tree-view";
import { TreeViewElement } from "@/component/tree-view-api";

type RepoTreeContentProps = {
  treeStructure: TreeViewElement[];
  repoName?: string;
};

export const CenteredMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center p-8 max-w-md mx-auto rounded-lg">
      {children}
    </div>
  </div>
);

export function RepoTreeContent({
  treeStructure,
  repoName,
}: RepoTreeContentProps) {
  return (
    <>
      {treeStructure && treeStructure.length > 0 ? (
        <TreeView elements={treeStructure} />
      ) : (
        <div>No data available for {repoName}</div>
      )}
    </>
  );
}
