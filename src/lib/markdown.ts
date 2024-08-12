import { TreeViewElement } from "@/component/tree-view-api";
import { decodeTreeViewElement } from "@/lib/converter";

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
  let result = ``;
  result += treeToMarkdown(tree, showIcons, showFiles);
  return result;
}

export const generateMarkdownTree = (
  treeData: string | TreeViewElement[],
  showIcons: boolean,
  showFiles: boolean
): string => {
  const data =
    typeof treeData === "string"
      ? decodeTreeViewElement(treeData).treeData
      : treeData;
  return convertTreeToMarkdown(data, showIcons, showFiles);
};

export const downloadMarkdown = (content: string, fileName: string): void => {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};
