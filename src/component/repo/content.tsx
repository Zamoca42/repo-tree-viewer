"use client";

import { TreeView } from "@/component/tree-view";
import { TreeViewElement } from "@/component/tree-view-api";

type RepoTreeContentProps = {
  treeStructure: TreeViewElement[];
  repoName?: string;
};

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
