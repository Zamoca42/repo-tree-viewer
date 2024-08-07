import { TreeViewElement } from "@/component/tree-view-api";
import { GitTreeItem } from "@/type";
import { serialize, deserialize } from "./serializer";

const sortTreeElements = (a: TreeViewElement, b: TreeViewElement): number => {
  if (a.children && !b.children) return -1;
  if (!a.children && b.children) return 1;
  return a.name.localeCompare(b.name);
};

const updateTreeMap = (
  map: Map<string, TreeViewElement>,
  parts: string[],
  index: number,
  element: TreeViewElement
): Map<string, TreeViewElement> => {
  const currentPath = parts.slice(0, index + 1).join("/");
  const parentPath = parts.slice(0, index).join("/");

  if (!map.has(currentPath)) {
    const newElement =
      index === parts.length - 1
        ? element
        : createTreeElement({ path: currentPath, type: "tree" });

    map.set(currentPath, newElement);

    if (parentPath) {
      const parent = map.get(parentPath);
      if (parent) {
        map.set(parentPath, addToParent(newElement, parent));
      }
    }
  }

  return map;
};

const createTreeElement = (
  item: Partial<GitTreeItem> & { path: string }
): TreeViewElement => ({
  id: item.path,
  name: item.path.split("/").pop() || "",
  isSelectable: true,
  children: item.type === "tree" ? [] : undefined,
});

const addToParent = (
  element: TreeViewElement,
  parent: TreeViewElement
): TreeViewElement => ({
  ...parent,
  children: [...(parent.children || []), element].sort(sortTreeElements),
});

const buildTreeMap = (tree: GitTreeItem[]): Map<string, TreeViewElement> =>
  tree.reduce((pathMap, item) => {
    const pathParts = item.path.split("/");
    const element = createTreeElement(item);

    return pathParts.reduce(
      (map, _, index, parts) => updateTreeMap(map, parts, index, element),
      pathMap
    );
  }, new Map<string, TreeViewElement>());

export const convertToTreeViewElement = (
  repoName: string,
  branch: string,
  tree: GitTreeItem[]
): string | null => {
  if (!tree || tree.length === 0) {
    return null;
  }
  const treeMap = buildTreeMap(tree);
  const treeViewElements = Array.from(treeMap.values())
    .filter((element) => !element.id.includes("/"))
    .sort(sortTreeElements);

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
