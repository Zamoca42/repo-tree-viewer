import { TreeViewElement } from "@/component/tree-view-api";
import { GitTreeItem } from "@/type";

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

