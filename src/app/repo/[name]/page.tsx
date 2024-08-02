import { RepoTree } from "@/component/repo-tree";
import { getRepoTree } from "@/lib/github";

export default async function RepoPage({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { name: string; branch: string };
}) {
  const { name } = params;
  const { branch } = searchParams;

  try {
    const data = await getRepoTree(name, branch);

    if (!data || !data.tree || !Array.isArray(data.tree)) {
      throw new Error("Invalid repository tree data");
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Repository: {name}</h1>
        <p className="mb-4">Branch: {branch}</p>
        <RepoTree tree={data.tree} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching repo tree:", error);
    return (
      <div>
        Error loading repository data. Please check the repository name and
        branch.
      </div>
    );
  }
}
