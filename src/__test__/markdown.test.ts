import { describe, it, expect, vi } from "vitest";
import { generateMarkdownTree, downloadMarkdown } from "@/lib/markdown";
import { TreeViewElement } from "@/component/tree-view-api";

describe("markdown", () => {
  describe("generateMarkdownTree", () => {
    it("should generate markdown for nested folders and files", () => {
      const tree: TreeViewElement[] = [
        {
          id: "1",
          name: "folder1",
          children: [
            { id: "2", name: "file1.txt" },
            {
              id: "3",
              name: "subfolder",
              children: [{ id: "4", name: "file2.txt" }],
            },
          ],
        },
        { id: "5", name: "file3.txt" },
      ];

      const expected =
        "├─ 📁 folder1\n" +
        "│  ├─ 📄 file1.txt\n" +
        "│  └─ 📁 subfolder\n" +
        "│     └─ 📄 file2.txt\n" +
        "└─ 📄 file3.txt\n";

      const result = generateMarkdownTree(tree);
      expect(result).toBe(expected);
    });

    it("should generate markdown for folders only", () => {
      const tree: TreeViewElement[] = [
        {
          id: "1",
          name: "folder1",
          children: [
            {
              id: "2",
              name: "subfolder1",
              children: [],
            },
          ],
        },
        {
          id: "3",
          name: "folder2",
          children: [],
        },
      ];

      const expected =
        "├─ 📁 folder1\n" + 
        "│  └─ 📁 subfolder1\n" + 
        "└─ 📁 folder2\n";

      const result = generateMarkdownTree(tree);
      expect(result).toBe(expected);
    });

    it("should generate markdown for files only", () => {
      const tree: TreeViewElement[] = [
        { id: "1", name: "file1.txt" },
        { id: "2", name: "file2.txt" },
      ];

      const expected = "├─ 📄 file1.txt\n" + "└─ 📄 file2.txt\n";

      const result = generateMarkdownTree(tree);
      expect(result).toBe(expected);
    });

    it("should return empty string when showFiles is false and only files exist", () => {
      const tree: TreeViewElement[] = [
        { id: "1", name: "file1.txt" },
        { id: "2", name: "file2.txt" },
      ];

      const result = generateMarkdownTree(tree, true, false);
      expect(result).toBeNull();
    });

    it("should generate markdown without icons", () => {
      const tree: TreeViewElement[] = [
        {
          id: "1",
          name: "folder1",
          children: [{ id: "2", name: "file1.txt" }],
        },
        { id: "3", name: "file2.txt" },
      ];

      const expected = "├─ folder1\n" + "│  └─ file1.txt\n" + "└─ file2.txt\n";

      const result = generateMarkdownTree(tree, false);
      expect(result).toBe(expected);
    });

    it("should handle empty tree", () => {
      const tree: TreeViewElement[] = [];

      const result = generateMarkdownTree(tree);
      expect(result).toBeNull();
    });

    it("should handle deep nesting", () => {
      const tree: TreeViewElement[] = [
        {
          id: "1",
          name: "level1",
          children: [
            {
              id: "2",
              name: "level2",
              children: [
                {
                  id: "3",
                  name: "level3",
                  children: [{ id: "4", name: "file.txt" }],
                },
              ],
            },
          ],
        },
      ];

      const expected =
        "└─ 📁 level1\n" +
        "   └─ 📁 level2\n" +
        "      └─ 📁 level3\n" +
        "         └─ 📄 file.txt\n";

      const result = generateMarkdownTree(tree);
      expect(result).toBe(expected);
    });
  });

  describe("downloadMarkdown", () => {
    it("should create and click a download link", () => {
      const content = "Test content";
      const fileName = "test.md";

      // Mock DOM methods
      const mockCreateElement = vi.fn().mockReturnValue({
        href: "",
        download: "",
        click: vi.fn(),
      });
      const mockCreateObjectURL = vi.fn().mockReturnValue("blob:url");
      const mockRevokeObjectURL = vi.fn();

      global.document.createElement = mockCreateElement;
      global.URL.createObjectURL = mockCreateObjectURL;
      global.URL.revokeObjectURL = mockRevokeObjectURL;

      downloadMarkdown(content, fileName);

      expect(mockCreateElement).toHaveBeenCalledWith("a");
      expect(mockCreateObjectURL).toHaveBeenCalled();
      expect(mockCreateElement.mock.results[0].value.click).toHaveBeenCalled();
      expect(mockRevokeObjectURL).toHaveBeenCalled();
    });
  });
});
