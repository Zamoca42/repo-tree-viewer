import pako from "pako";

const toUrlSafeBase64 = (base64: string): string => {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};

const fromUrlSafeBase64 = (urlSafe: string): string => {
  let base64 = urlSafe.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  return base64;
};

export const serializePako = (data: any): string => {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(jsonString);
  const base64 = btoa(String.fromCharCode.apply(null, Array.from(compressed)));
  return toUrlSafeBase64(base64);
};

export const deserializePako = (compressed: string): any => {
  const base64 = fromUrlSafeBase64(compressed);
  const binaryString = atob(base64);
  const charArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    charArray[i] = binaryString.charCodeAt(i);
  }
  const decompressed = pako.inflate(charArray);
  const jsonString = new TextDecoder().decode(decompressed);
  return JSON.parse(jsonString);
};

export const serialize = serializePako;
export const deserialize = deserializePako;
