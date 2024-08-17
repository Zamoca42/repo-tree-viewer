import { describe, it, expect } from "vitest";
import { buildTreeStructure } from "@/lib/converter";
import { GitTreeItem } from "@/type";
import treeItems from "./sample/next-blog.json";
import { TreeViewElement } from "@/component/tree-view-api";

describe("buildTreeStructure", () => {
  it("should correctly build tree structure from GitHub API response", () => {
    const result = buildTreeStructure(treeItems as GitTreeItem[]);

    expect(result).toHaveLength(14);
    expect(result.map((item) => item.name)).toEqual(
      expect.arrayContaining([
        "content",
        "public",
        "src",
        ".gitignore",
        ".gitmessage.txt",
        ".markdownlint.json",
        "components.json",
        "next.config.mjs",
        "package-lock.json",
        "package.json",
        "postcss.config.cjs",
        "README.md",
        "tailwind.config.ts",
        "tsconfig.json",
      ])
    );

    const findItem = (
      items: TreeViewElement[],
      path: string
    ): TreeViewElement | undefined => {
      const parts = path.split("/");
      let current: TreeViewElement | undefined = items.find(
        (item) => item.name === parts[0]
      );
      for (let i = 1; i < parts.length && current; i++) {
        current = current.children?.find((child) => child.name === parts[i]);
      }
      return current;
    };

    const content = findItem(result, "content");
    expect(content?.children).toBeDefined();
    expect(content?.children).toHaveLength(4);
    expect(content?.children?.map((child) => child.name)).toEqual(
      expect.arrayContaining(["db", "js-ts", "db", "infra"])
    );

    const src = findItem(result, "src");
    expect(src?.children).toBeDefined();
    expect(src?.children?.map((child) => child.name)).toEqual(
      expect.arrayContaining([
        "app",
        "component",
        "interface",
        "lib",
        "script",
        "style",
      ])
    );

    const sqlFolder = findItem(result, "content/db/sql");
    expect(sqlFolder).toBeDefined();
    expect(sqlFolder?.children).toHaveLength(4);
    expect(sqlFolder?.children?.map((child) => child.name)).toEqual(
      expect.arrayContaining(["sql-subquery.md", "sql.md", "sql2.md"])
    );

    const gitignore = findItem(result, ".gitignore");
    expect(gitignore).toBeDefined();
    expect(gitignore?.children).toBeUndefined();

    const dynamooseMd = findItem(result, "content/db/dynamoose.md");
    expect(dynamooseMd).toBeDefined();
    expect(dynamooseMd?.children).toBeUndefined();

    const deepdiveMd = findItem(result, "content/js-ts/deepdive/deepdive48.md");
    expect(deepdiveMd).toBeDefined();
    expect(deepdiveMd?.children).toBeUndefined();

    const checkItemProperties = (item: TreeViewElement) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("isSelectable", true);
      if (item.children) {
        item.children.forEach(checkItemProperties);
      }
    };
    result.forEach(checkItemProperties);
  });
});
