import { MAX_URL_LENGTH } from "@/lib/constant";
import { TreeViewElement } from "@/component/tree-view-api";
import { getCompressedContext } from "@/lib/handler";

export const generateShareableUrl = async (
  tree: TreeViewElement[],
  treeParam: string | null,
  name: string
): Promise<string> => {
  const baseUrl = window.location.origin;
  const compressedData = treeParam || (await getCompressedContext(name, tree));
  const sharedUrl = `${baseUrl}/repo?t=${compressedData}`;

  if (!compressedData) {
    throw new Error("Failed to generate compressed context");
  }

  if (sharedUrl.length > MAX_URL_LENGTH) {
    throw new Error(
      `URL length (${sharedUrl.length}) exceeds maximum allowed length (${MAX_URL_LENGTH})`
    );
  }

  return sharedUrl;
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    throw err;
  }
};
