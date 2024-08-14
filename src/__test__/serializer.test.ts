import { describe, it, expect } from "vitest";
import {
  serialize,
  deserialize,
  toUrlSafeBase64,
  fromUrlSafeBase64,
} from "@/lib/serializer";

describe("Serializer", () => {
  describe("serialize and deserialize", () => {
    it("should correctly serialize and deserialize simple objects", () => {
      const testData = { name: "Test", value: 42 };
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });

    it("should correctly handle complex nested objects", () => {
      const testData = {
        array: [1, 2, 3],
        nested: { a: 1, b: { c: 2 } },
        string: "Hello, World!",
        number: 3.14159,
        boolean: true,
        null: null,
      };
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });

    it("should handle empty objects", () => {
      const testData = {};
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });

    it("should handle large arrays", () => {
      const testData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        value: `Item ${i}`,
      }));
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });
  });

  describe("URL-safe Base64", () => {
    it("should convert to and from URL-safe Base64", () => {
      const original = "Hello+World/==";
      const urlSafe = toUrlSafeBase64(original);
      expect(urlSafe).not.toContain("+");
      expect(urlSafe).not.toContain("/");
      expect(urlSafe).not.toContain("=");
      const restored = fromUrlSafeBase64(urlSafe);
      expect(restored.replace(/=+$/, "")).toEqual(original.replace(/=+$/, ""));
    });
  });

  describe("Edge cases", () => {
    it("should handle very long strings", () => {
      const longString = "a".repeat(10000);
      const testData = { longString };
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });

    it("should handle special characters", () => {
      const testData = { special: '!@#$%^&*()_+{}[]|":;<>?,./' };
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });

    it("should handle Unicode characters", () => {
      const testData = { unicode: "안녕하세요 🌍" };
      const serialized = serialize(testData);
      const deserialized = deserialize(serialized);
      expect(deserialized).toEqual(testData);
    });
  });
});
