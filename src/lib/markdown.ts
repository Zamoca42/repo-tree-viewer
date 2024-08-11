import { TreeViewElement } from "@/component/tree-view-api";

function treeToMarkdown(
  tree: TreeViewElement[],
  showIcons: boolean = true,
  showFiles: boolean = true,
  level: number = 0
): string {
  let result = "";

  const visibleItems = showFiles ? tree : tree.filter((item) => item.children);

  visibleItems.forEach((item, index) => {
    const isLast = index === visibleItems.length - 1;
    const prefix = level === 0 ? "" : isLast ? "└─ " : "├─ ";
    const indent = "│  ".repeat(level);

    const folderIcon = showIcons ? "📁 " : "";
    const fileIcon = showIcons ? "📄 " : "";

    if (item.children) {
      result += `${indent}${prefix}${folderIcon}${item.name}\n`;
      result += treeToMarkdown(item.children, showIcons, showFiles, level + 1);
    } else if (showFiles) {
      result += `${indent}${prefix}${fileIcon}${item.name}\n`;
    }
  });

  return result;
}

export function convertTreeToMarkdown(
  tree: TreeViewElement[],
  showIcons: boolean = true,
  showFiles: boolean = true
): string {
  let result = `\n`;
  result += treeToMarkdown(tree, showIcons, showFiles);
  return result;
}
