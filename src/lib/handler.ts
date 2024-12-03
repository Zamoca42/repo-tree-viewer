import { getRepoTree } from "@/lib/github";
import { buildTreeStructure } from "@/lib/converter";
import { TreeViewElement } from "@/component/tree-view-api";

export const getTreeStructure = async (
  name: string,
  branch: string
): Promise<TreeViewElement[]> => {
  const tree = await getRepoTree(name, branch);
  return buildTreeStructure(tree);
};
