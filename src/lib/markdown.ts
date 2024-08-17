import { TreeViewElement } from "@/component/tree-view-api";

const treeToMarkdown = (
  tree: TreeViewElement[],
  showIcons: boolean = true,
  showFiles: boolean = true,
  level: number = 0,
  prefix: string = ""
): string => {
  let result = "";

  const visibleItems = showFiles ? tree : tree.filter((item) => item.children);

  visibleItems.forEach((item, index) => {
    const isLast = index === visibleItems.length - 1;
    const currentPrefix = isLast ? "└─ " : "├─ ";
    const nextPrefix = isLast ? "   " : "│  ";

    const folderIcon = showIcons ? "📁 " : "";
    const fileIcon = showIcons ? "📄 " : "";

    if (item.children) {
      result += `${prefix}${currentPrefix}${folderIcon}${item.name}\n`;
      result += treeToMarkdown(
        item.children,
        showIcons,
        showFiles,
        level + 1,
        prefix + nextPrefix
      );
    } else if (showFiles) {
      result += `${prefix}${currentPrefix}${fileIcon}${item.name}\n`;
    }
  });

  return result;
};

export const generateMarkdownTree = (
  tree: TreeViewElement[],
  showIcons: boolean = true,
  showFiles: boolean = true
): string | null => {
  const markdownTree = treeToMarkdown(tree, showIcons, showFiles);
  return markdownTree || null;
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
