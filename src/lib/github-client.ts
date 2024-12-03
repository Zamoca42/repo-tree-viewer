import { Repository, GitTreeResponse, GitTreeItem } from "@/type";
import ky from "ky";

export class GitHubClient {
  private client: typeof ky;

  constructor(accessToken: string) {
    this.client = ky.extend({
      prefixUrl: "https://api.github.com",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  async getRepositories(page: number = 1): Promise<Repository[]> {
    return this.client.get("user/repos", {
      searchParams: {
        per_page: "100",
        page: page.toString(),
        sort: "updated",
      }
    }).json<Repository[]>();
  }

  async getRepoTree(username: string, repoName: string, branch: string): Promise<GitTreeItem[]> {
    const data = await this.client
      .get(`repos/${username}/${repoName}/git/trees/${branch}`, {
        searchParams: { recursive: "1" },
      })
      .json<GitTreeResponse>();

    if (!data.tree || !Array.isArray(data.tree)) {
      throw new Error("Invalid repository tree data structure");
    }

    return data.tree;
  }
}