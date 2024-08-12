import { MAX_URL_LENGTH } from "@/lib/constant";
import { TreeViewElement } from "@/component/tree-view-api";
import { getCompressedContext } from "@/lib/handler";

export const generateShareableUrl = async (
  tree: TreeViewElement[],
  treeParam: string | null,
  name: string | null
): Promise<string> => {
  let sharedUrl: string;
  const baseUrl = window.location.origin;

  if (tree && name) {
    const compressedContext = await getCompressedContext(name, tree);
    sharedUrl = `${baseUrl}/repo?t=${compressedContext}`;
  } else if (treeParam) {
    sharedUrl = `${baseUrl}/repo?t=${tree}`;
  } else {
    throw new Error("Invalid parameters for sharing URL");
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
