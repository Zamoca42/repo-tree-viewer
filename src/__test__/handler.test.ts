import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getCompressedContext,
  getTreeStructure,
  decodeTreeViewElement,
} from "@/lib/handler";
import { serialize, deserialize } from "@/lib/serializer";
import { getRepoTree } from "@/lib/github";
import { buildTreeStructure } from "@/lib/converter";
import { TreeViewElement } from "@/component/tree-view-api";
import { GitTreeItem } from "@/type";

vi.mock("@/lib/serializer");
vi.mock("@/lib/github");
vi.mock("@/lib/converter");

describe("handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("getCompressedContext", () => {
    it("should return compressed context for valid input", async () => {
      const mockRepoName = "test-repo";
      const mockTreeStructure: TreeViewElement[] = [
        { id: "1", name: "file1.txt" },
        { id: "2", name: "file2.txt" },
      ];
      const mockCompressedContext = "compressed-data";

      vi.mocked(serialize).mockReturnValue(mockCompressedContext);

      const result = await getCompressedContext(
        mockRepoName,
        mockTreeStructure
      );

      expect(result).toBe(mockCompressedContext);
      expect(serialize).toHaveBeenCalledWith({
        repoName: mockRepoName,
        elements: mockTreeStructure,
      });
    });

    it("should return null for empty tree structure", async () => {
      const mockRepoName = "test-repo";
      const mockTreeStructure: TreeViewElement[] = [];

      const result = await getCompressedContext(
        mockRepoName,
        mockTreeStructure
      );

      expect(result).toBeNull();
      expect(serialize).not.toHaveBeenCalled();
    });

    it("should return null if serialization fails", async () => {
      const mockRepoName = "test-repo";
      const mockTreeStructure: TreeViewElement[] = [
        { id: "1", name: "file1.txt" },
      ];

      vi.mocked(serialize).mockReturnValue("");

      const result = await getCompressedContext(
        mockRepoName,
        mockTreeStructure
      );

      expect(result).toBe("");
      expect(serialize).toHaveBeenCalled();
    });
  });

  describe("getTreeStructure", () => {
    it("should return tree structure for valid input", async () => {
      const mockName = "test-repo";
      const mockBranch = "main";
      const mockRepoTree: GitTreeItem[] = [
        {
          path: "file1.txt",
          mode: "100644",
          type: "blob",
          sha: "abcdef1234567890",
          url: "https://api.github.com/repos/test/test-repo/git/blobs/abcdef1234567890",
        },
      ];
      const mockTreeStructure = [{ id: "file1.txt", name: "file1.txt" }];

      vi.mocked(getRepoTree).mockResolvedValue(mockRepoTree);
      vi.mocked(buildTreeStructure).mockReturnValue(mockTreeStructure);

      const result = await getTreeStructure(mockName, mockBranch);

      expect(result).toEqual(mockTreeStructure);
      expect(getRepoTree).toHaveBeenCalledWith(mockName, mockBranch);
      expect(buildTreeStructure).toHaveBeenCalledWith(mockRepoTree);
    });

    it("should throw an error if getRepoTree fails", async () => {
      const mockName = "test-repo";
      const mockBranch = "main";
      const mockError = new Error("API error");

      vi.mocked(getRepoTree).mockRejectedValue(mockError);

      await expect(getTreeStructure(mockName, mockBranch)).rejects.toThrow(
        "API error"
      );
    });
  });

  describe("decodeTreeViewElement", () => {
    it("should decode compressed data correctly", () => {
      const mockCompressed = "compressed-data";
      const mockDecodedData = {
        repoName: "test-repo",
        elements: [{ id: "1", name: "file1.txt" }],
      };

      vi.mocked(deserialize).mockReturnValue(mockDecodedData);

      const result = decodeTreeViewElement(mockCompressed);

      expect(result).toEqual(mockDecodedData);
      expect(deserialize).toHaveBeenCalledWith(mockCompressed);
    });

    it("should throw an error if deserialization fails", () => {
      const mockCompressed = "invalid-compressed-data";

      vi.mocked(deserialize).mockImplementation(() => {
        throw new Error("Deserialization failed");
      });

      expect(() => decodeTreeViewElement(mockCompressed)).toThrow(
        "Deserialization failed"
      );
    });
  });
});
