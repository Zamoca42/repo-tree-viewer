import { LoginButton, LogoutButton } from "@/component/auth-button";
import { CenteredMessage, RepoTreeContent } from "@/component/content";
import { RepoHeader } from "@/component/header";
import { TreeSkeletonLoader } from "@/component/loader";
import { TreeViewElement } from "@/component/tree-view-api";
import { auth } from "@/lib/auth";
import { getTreeData } from "@/lib/handler";
import { Suspense } from "react";

export default async function RepoPage({
  searchParams,
}: {
  searchParams: { t?: string; n?: string; b?: string };
}) {
  const { t: tree, n: name, b: branch } = searchParams;
  const session = await auth();

  let treeData: string | TreeViewElement[] | undefined = tree;

  if (name && branch && !tree) {
    try {
      if (!session) {
        return (
          <CenteredMessage>
            <h2 className="text-xl font-semibold mb-4">
              Authentication Required
            </h2>
            <p className="mb-4">Please log in to access this repository.</p>
            <LoginButton />
          </CenteredMessage>
        );
      }
      treeData = await getTreeData(name, branch);
    } catch (error) {
      console.error("Error fetching repo tree:", error);
      if (error instanceof Error && error.message.includes("401")) {
        return (
          <CenteredMessage>
            <h2 className="text-xl font-semibold mb-4">
              Authentication Failed
            </h2>
            <p className="mb-4">Please log out and log in again.</p>
            <LogoutButton />
          </CenteredMessage>
        );
      }
      return (
        <CenteredMessage>
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>
            An error occurred while loading repository data. Please try again
            later.
          </p>
        </CenteredMessage>
      );
    }
  }

  if (!treeData) {
    return (
      <CenteredMessage>
        <h2 className="text-xl font-semibold mb-4">Invalid Parameters</h2>
        <p>Please provide valid parameters.</p>
      </CenteredMessage>
    );
  }

  return (
    <>
      <RepoHeader treeData={treeData} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<TreeSkeletonLoader />}>
          <RepoTreeContent
            treeData={treeData}
            repoName={name}
            branch={branch}
          />
        </Suspense>
      </div>
    </>
  );
}
