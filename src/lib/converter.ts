import { TreeViewElement } from "@/component/tree-view-api";
import { GitTreeItem } from "@/type";
import { serialize, deserialize } from "./serializer";

const sortTreeElements = (a: TreeViewElement, b: TreeViewElement): number => {
  if (a.children && !b.children) return -1;
  if (!a.children && b.children) return 1;
  return a.name.localeCompare(b.name, undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

const createTreeElement = (item: GitTreeItem): TreeViewElement => ({
  id: item.path,
  name: item.path.split("/").pop() || "",
  isSelectable: true,
  children: item.type === "tree" ? [] : undefined,
});

export const buildTreeStructure = (tree: GitTreeItem[]): TreeViewElement[] => {
  const root: TreeViewElement[] = [];
  const map = new Map<string, TreeViewElement>();

  tree.forEach((item) => {
    const element = createTreeElement(item);
    map.set(item.path, element);

    const parentPath = item.path.split("/").slice(0, -1).join("/");
    const parent = parentPath ? map.get(parentPath) : null;

    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(element);
      parent.children.sort(sortTreeElements);
    } else {
      root.push(element);
    }
  });

  return root.sort(sortTreeElements);
};

export const convertToTreeViewElement = (
  repoName: string,
  branch: string,
  tree: GitTreeItem[]
): string | null => {
  if (!tree || tree.length === 0) {
    return null;
  }

  const treeViewElements = buildTreeStructure(tree);

  const repoContext = {
    repoName,
    branch,
    treeData: treeViewElements,
  };

  return serialize(repoContext);
};

export const decodeTreeViewElement = (
  compressed: string
): { repoName: string; branch: string; treeData: TreeViewElement[] } => {
  return deserialize(compressed);
};

export const getRepoName = (
  tree: string | null,
  name: string | null
): string => {
  if (!tree) return name ?? "Repository Tree";
  try {
    return decodeTreeViewElement(tree).repoName;
  } catch (error) {
    console.error("Error decoding tree data:", error);
    return "Error decoding repository name";
  }
};
