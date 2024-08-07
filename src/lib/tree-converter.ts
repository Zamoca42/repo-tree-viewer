import { TreeViewElement } from "@/component/tree-view-api";
import { GitTreeItem } from "@/type";

const sortTreeElements = (a: TreeViewElement, b: TreeViewElement): number => {
  if (a.children && !b.children) return -1;
  if (!a.children && b.children) return 1;
  return a.name.localeCompare(b.name);
};

export const convertToTreeViewElement = (
  tree: GitTreeItem[]
): TreeViewElement[] => {
  const createTreeElement = (
    item: Partial<GitTreeItem> & { path: string }
  ): TreeViewElement => ({
    id: item.path,
    name: item.path.split("/").pop() || "",
    isSelectable: true,
    children: item.type === "tree" ? [] : undefined,
  });

  const addToParent = (element: TreeViewElement, parent: TreeViewElement) => {
    parent.children = [...(parent.children || []), element].sort(
      sortTreeElements
    );
  };

  const pathMap = new Map<string, TreeViewElement>();

  tree.forEach((item) => {
    const pathParts = item.path.split("/");
    const element = createTreeElement(item);

    pathParts.reduce((parentPath, part, index) => {
      const currentPath = parentPath ? `${parentPath}/${part}` : part;

      if (!pathMap.has(currentPath)) {
        const newElement =
          index === pathParts.length - 1
            ? element
            : createTreeElement({ path: currentPath, type: "tree" });
        pathMap.set(currentPath, newElement);

        if (parentPath) {
          const parent = pathMap.get(parentPath);
          if (parent) addToParent(newElement, parent);
        }
      }

      return currentPath;
    }, "");
  });

  return Array.from(pathMap.values())
    .filter((element) => !element.id.includes("/"))
    .sort(sortTreeElements);
};
