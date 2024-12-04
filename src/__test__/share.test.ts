import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { copyToClipboard } from "@/lib/share";

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
