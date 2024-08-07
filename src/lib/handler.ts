import { getRepoTree } from "@/lib/github";
import { convertToTreeViewElement } from "@/lib/converter";
import { Repository } from "@/type"; // Repository 타입을 정의해야 합니다.

type ProcessedRepo = Repository & { compressedContext: string | null };

const getCompressedContext = async (
  repoName: string,
  defaultBranch: string
): Promise<string | null> => {
  const treeData = await getRepoTree(repoName, defaultBranch);
  if (!treeData || !treeData.tree) {
    console.warn(`Empty tree data for repository: ${repoName}`);
    return null;
  }

  const compressedContext = convertToTreeViewElement(
    repoName,
    defaultBranch,
    treeData.tree
  );

  if (compressedContext === null) {
    console.warn(`Failed to compress tree data for repository: ${repoName}`);
    return null;
  }

  return compressedContext;
};

export const processRepository = async (
  repo: Repository
): Promise<ProcessedRepo> => {
  try {
    const compressedContext = await getCompressedContext(
      repo.name,
      repo.default_branch
    );
    return { ...repo, compressedContext };
  } catch (error) {
    console.error(`Error processing repository ${repo.name}:`, error);
    return { ...repo, compressedContext: null };
  }
};

export const processRepositories = (
  repos: Repository[]
): Promise<ProcessedRepo[]> => Promise.all(repos.map(processRepository));
