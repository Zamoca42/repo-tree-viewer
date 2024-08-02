import { auth } from "@/lib/auth";

export interface Repository {
  id: number;
  name: string;
  private: boolean;
  html_url: string;
  default_branch: string;
}

export async function fetchRepositories(): Promise<Repository[]> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("No access token");
  }

  const response = await fetch("https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  const repos: Repository[] = await response.json();
  return repos;
}

export async function getRepoTree(repoName: string, branch: string) {
  const session = await auth();
  console.log(session?.user.username);
  if (!session?.accessToken || !session?.user.username) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `https://api.github.com/repos/${session.user.username}/${repoName}/git/trees/${branch}?recursive=1`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    console.log(await response.json());
    throw new Error("Failed to fetch repository tree");
  }

  const data = await response.json();
  if (!data.tree || !Array.isArray(data.tree)) {
    throw new Error("Invalid repository tree data structure");
  }

  return data;
}
