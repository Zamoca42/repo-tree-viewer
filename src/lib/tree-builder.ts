import { TreeViewElement } from "@/component/tree-view-api";
import { GitTreeItem } from "@/type";

export class TreeBuilder {
  private root: TreeViewElement[] = [];
  private map = new Map<string, TreeViewElement>();

  private sortTreeElements(a: TreeViewElement, b: TreeViewElement): number {
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    return a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  private createTreeElement(item: GitTreeItem): TreeViewElement {
    return {
      id: item.path,
      name: item.path.split("/").pop() || "",
      isSelectable: true,
      children: item.type === "tree" ? [] : undefined,
    };
  }

  build(tree: GitTreeItem[]): TreeViewElement[] {
    tree.forEach((item) => {
      const element = this.createTreeElement(item);
      this.map.set(item.path, element);

      const parentPath = item.path.split("/").slice(0, -1).join("/");
      const parent = parentPath ? this.map.get(parentPath) : null;

      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(element);
        parent.children.sort(this.sortTreeElements);
      } else {
        this.root.push(element);
      }
    });

    return this.root.sort(this.sortTreeElements);
  }
}