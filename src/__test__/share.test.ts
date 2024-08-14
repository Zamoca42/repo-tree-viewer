import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateShareableUrl, copyToClipboard } from "@/lib/share";
import { getCompressedContext } from "@/lib/handler";
import { MAX_URL_LENGTH } from "@/lib/constant";

vi.mock("@/lib/handler", () => ({
  getCompressedContext: vi.fn(),
}));

vi.mock("@/lib/constant", () => ({
  MAX_URL_LENGTH: 2000,
}));

describe("share", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "location", {
      value: { origin: "http://localhost:3000" },
      writable: true,
    });
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("generateShareableUrl", () => {
    it("should use treeParam if provided", async () => {
      const result = await generateShareableUrl([], "existingParam", "repo");
      expect(result).toBe("http://localhost:3000/repo?t=existingParam");
      expect(getCompressedContext).not.toHaveBeenCalled();
    });

    it("should generate new compressed context if treeParam is not provided", async () => {
      vi.mocked(getCompressedContext).mockResolvedValue("newCompressedData");
      const result = await generateShareableUrl(
        [{ id: "1", name: "file.txt" }],
        null,
        "repo"
      );
      expect(result).toBe("http://localhost:3000/repo?t=newCompressedData");
      expect(getCompressedContext).toHaveBeenCalledWith("repo", [
        { id: "1", name: "file.txt" },
      ]);
    });

    it("should throw an error if compressed data is null", async () => {
      vi.mocked(getCompressedContext).mockResolvedValue(null);
      await expect(generateShareableUrl([], null, "repo")).rejects.toThrow(
        "Failed to generate compressed context"
      );
    });

    it("should throw an error if URL length exceeds MAX_URL_LENGTH", async () => {
      const longCompressedData = "a".repeat(MAX_URL_LENGTH);
      vi.mocked(getCompressedContext).mockResolvedValue(longCompressedData);
      await expect(generateShareableUrl([], null, "repo")).rejects.toThrow(
        /URL length .* exceeds maximum allowed length/
      );
    });
  });

  describe("copyToClipboard", () => {
    it("should copy text to clipboard", async () => {
      const mockWriteText = vi.fn();
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      await copyToClipboard("test text");
      expect(mockWriteText).toHaveBeenCalledWith("test text");
    });

    it("should throw an error if clipboard write fails", async () => {
      const mockWriteText = vi
        .fn()
        .mockRejectedValue(new Error("Clipboard error"));
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      await expect(copyToClipboard("test text")).rejects.toThrow(
        "Clipboard error"
      );
    });
  });
});
