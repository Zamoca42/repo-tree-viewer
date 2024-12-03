import { auth } from "@/lib/auth";
import { Repository, GitTreeResponse, GitTreeItem } from "@/type";
import ky from "ky";
import { Session } from "next-auth";

const createGitHubClient = (accessToken: string) =>
  ky.extend({
    prefixUrl: "https://api.github.com",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const handleApiError = (error: unknown) => {
  if (error instanceof Error) {
    console.error("API Error:", error.message);
    throw new Error(`GitHub API Error: ${error.message}`);
  }
  throw error;
};

const validateSession = (session: Session | null) => {
  if (!session?.accessToken) {
    throw new Error("No access token");
  }
  return session.accessToken;
};

export const fetchRepositories = async (): Promise<Repository[]> => {
  const session = await auth();
  const accessToken = validateSession(session);

  try {
    const client = createGitHubClient(accessToken);
    return client.get("user/repos", {
      searchParams: {
        per_page: "100",
        sort: "updated",
      },
    }).json<Repository[]>();
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRepoTree = async (
  repoName: string,
  branch: string
): Promise<GitTreeItem[]> => {
  const session = await auth();
  const accessToken = validateSession(session);

  if (!session?.user?.username) {
    throw new Error("GitHub username not found");
  }

  try {
    const client = createGitHubClient(accessToken);
    const data = await client
      .get(`repos/${session.user.username}/${repoName}/git/trees/${branch}`, {
        searchParams: { recursive: "1" },
      })
      .json<GitTreeResponse>();

    if (!data.tree || !Array.isArray(data.tree)) {
      throw new Error("Invalid repository tree data structure");
    }

    return data.tree;
  } catch (error) {
    return handleApiError(error);
  }
};
