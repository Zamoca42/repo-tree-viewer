import { RepoTreeContent } from "@/component/content";
import { RepoHeader } from "@/component/header";
import { TreeSkeletonLoader } from "@/component/loader";
import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";
import { Suspense } from "react";

type SearchParams = Promise<{
  n: string;
  b: string;
}>;

interface PageProps {
  searchParams: SearchParams;
}
export default async function RepoPage({ searchParams }: PageProps) {
  const { n: repoName, b: branch } = await searchParams;

  if (!repoName || !branch) {
    throw new Error("Invalid Parameters");
  }

  const session = await auth();
  const githubClient = new GitHubClient(session);
  const structuredRepoTree = await githubClient.getStructuredRepoTree(
    repoName,
    branch
  );

  return (
    <>
      <RepoHeader
        name={structuredRepoTree.repoName}
        treeStructure={structuredRepoTree.elements}
      />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<TreeSkeletonLoader />}>
          <RepoTreeContent
            treeStructure={structuredRepoTree.elements}
            repoName={structuredRepoTree.repoName}
          />
        </Suspense>
      </div>
    </>
  );
}
