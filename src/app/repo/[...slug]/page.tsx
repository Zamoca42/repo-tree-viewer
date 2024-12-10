import { RepoTreeContent } from "@/component/repo/content";
import { RepoContentMenu } from "@/component/repo/content-menu";
import { RepoHeader } from "@/component/repo/header";
import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";

type SearchParams = Promise<{
  b: string;
}>;

type Params = Promise<{
  slug: string[];
}>;

interface PageProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function RepoPage({ params, searchParams }: PageProps) {
  const { b: branch } = await searchParams;
  const { slug } = await params;
  const repoName = slug[1];

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
      <header className="flex h-16 shrink-0 items-center gap-2">
        <RepoHeader />
      </header>
      <div className="flex flex-1 flex-col gap-4 px-4 pt-0">
        <div className="min-h-[50vh] rounded-xl bg-sidebar">
          <RepoContentMenu
            treeStructure={structuredRepoTree}
            repoName={repoName}
          />
          <RepoTreeContent
            treeStructure={structuredRepoTree}
            repoName={repoName}
          />
        </div>
      </div>
    </>
  );
}
