import { RepoTreeContent } from "@/component/content";
import { RepoHeader } from "@/component/header";
import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";

type SearchParams = Promise<{
  b: string;
}>;

type Params = Promise<{
  name: string;
}>

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function RepoPage({ params, searchParams }: PageProps) {
  const { b: branch } = await searchParams;
  const { name: repoName } = await params;

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
      <RepoHeader name={repoName} treeStructure={structuredRepoTree} />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <RepoTreeContent
          treeStructure={structuredRepoTree}
          repoName={repoName}
        />
      </div>
    </>
  );
}
