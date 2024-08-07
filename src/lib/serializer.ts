import LZString from "lz-string";

export const serialize = (data: any): string => {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
};

export const deserialize = (compressed: string): any => {
  const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
  if (decompressed === null) {
    throw new Error("Failed to decompress data");
  }
  return JSON.parse(decompressed);
};
