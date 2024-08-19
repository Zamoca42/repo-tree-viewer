import { deflateSync, inflateSync } from "zlib";

export const toUrlSafeBase64 = (base64: string): string => {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

export const fromUrlSafeBase64 = (urlSafe: string): string => {
  let base64 = urlSafe.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return base64;
};

export const serializeZlib = (data: any): string => {
  const jsonString = JSON.stringify(data);
  const compressed = deflateSync(Buffer.from(jsonString));
  const base64 = compressed.toString("base64");
  return toUrlSafeBase64(base64);
};

export const deserializeZlib = (compressed: string): any => {
  const base64 = fromUrlSafeBase64(compressed);
  const buffer = Buffer.from(base64, "base64");
  const decompressed = inflateSync(buffer);
  const jsonString = decompressed.toString();
  return JSON.parse(jsonString);
};

export const serialize = serializeZlib;
export const deserialize = deserializeZlib;
