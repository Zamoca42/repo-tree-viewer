import ky from "ky";
import { MAX_URL_LENGTH } from "@/lib/constant";

export async function generateShareableUrl(
  name: string | null,
  branch: string | null,
  tree: string | null
): Promise<string> {
  let sharedUrl: string;
  const baseUrl = window.location.origin;

  if (name && branch) {
    const { compressedContext } = await ky
      .get(`/api/repo-context`, {
        searchParams: { name, branch },
      })
      .json<{ compressedContext: string }>();
    sharedUrl = `${baseUrl}/repo?t=${compressedContext}`;
  } else if (tree) {
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
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
    throw err;
  }
}
