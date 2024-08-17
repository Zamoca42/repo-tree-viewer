import { decodeTreeViewElement, getTreeStructure } from "@/lib/handler";
import { TreeStructureSchema, urlSafeBase64Pattern } from "@/lib/schema";
import { RepoError } from "@/lib/error";
import { z } from "zod";

export const getTreeFromRepo = async (
  name: string,
  branch: string,
  session: any
): Promise<z.infer<typeof TreeStructureSchema>> => {
  if (!session) {
    throw new RepoError(
      "Please log in to access this repository.",
      "Authentication Required"
    );
  }

  try {
    const fetchedTree = await getTreeStructure(name, branch);
    return TreeStructureSchema.parse({
      repoName: name,
      elements: fetchedTree,
    });
  } catch (error) {
    console.error("Error fetching repo tree:", error);
    if (error instanceof Error && error.message.includes("401")) {
      throw new RepoError(
        "Please log out and log in again.",
        "Authentication Failed"
      );
    }
    throw new RepoError(
      "An error occurred while loading repository data. Please try again later.",
      "Error"
    );
  }
};

export const getTreeFromEncoded = (
  tree: string
): z.infer<typeof TreeStructureSchema> => {
  if (!urlSafeBase64Pattern.test(tree)) {
    throw new RepoError(
      "The provided tree parameter is not a valid URL-safe base64 string.",
      "Invalid Tree Parameter"
    );
  }

  try {
    const decodedTree = decodeTreeViewElement(tree);
    return TreeStructureSchema.parse(decodedTree);
  } catch (error) {
    console.error("Error decoding tree structure:", error);
    throw new RepoError(
      "The provided tree structure is invalid or corrupted.",
      "Invalid Tree Structure"
    );
  }
};
