import { LoginButton, LogoutButton } from "@/component/auth-button";
import { RepoTreeContent } from "@/component/content";
import { RepoHeader } from "@/component/header";
import { TreeSkeletonLoader } from "@/component/loader";
import { auth } from "@/lib/auth";
import { decodeTreeViewElement } from "@/lib/converter";
import { RepoError } from "@/lib/error";
import { getTreeStructure } from "@/lib/handler";
import { TreeStructureSchema, urlSafeBase64Pattern } from "@/lib/schema";
import { Suspense } from "react";
import { z } from "zod";

export const getTreeFromRepo = async (
  name: string,
  branch: string,
  session: any
): Promise<z.infer<typeof TreeStructureSchema>> => {
  if (!session) {
    throw new RepoError(
      "Please log in to access this repository.",
      "Authentication Required",
      <LoginButton />
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
        "Authentication Failed",
        <LogoutButton />
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

export default async function RepoPage({
  searchParams,
}: {
  searchParams: { t?: string; n?: string; b?: string };
}) {
  const { t: tree, n: name, b: branch } = searchParams;
  const session = await auth();

  let treeStructure: z.infer<typeof TreeStructureSchema>;

  if (tree) {
    treeStructure = getTreeFromEncoded(tree);
  } else if (name && branch) {
    treeStructure = await getTreeFromRepo(name, branch, session);
  } else {
    throw new Error("Invalid Parameters");
  }

  return (
    <>
      <RepoHeader
        name={treeStructure.repoName}
        treeStructure={treeStructure.elements}
      />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<TreeSkeletonLoader />}>
          <RepoTreeContent
            treeStructure={treeStructure.elements}
            repoName={treeStructure.repoName}
          />
        </Suspense>
      </div>
    </>
  );
}
