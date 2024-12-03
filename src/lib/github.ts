import { Repository, GitTreeResponse } from "@/type";
import ky from "ky";
import { TreeBuilder } from "@/lib/tree";
import { TreeStructureSchema } from "@/lib/schema";
import { z } from "zod";
import { Session } from "next-auth";

export class GitHubClient {
  private client: typeof ky;
  private username: string;
  private accessToken: string;

  constructor(session: Session | null) {
    this.validateSession(session);
    this.username = this.getSessionUsername(session);
    this.accessToken = this.validateAccessToken(session?.accessToken);

    this.client = ky.extend({
      prefixUrl: "https://api.github.com",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
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

  async getStructuredRepoTree(repoName: string, branch: string): Promise<z.infer<typeof TreeStructureSchema>> {
    const data = await this.client
      .get(`repos/${this.username}/${repoName}/git/trees/${branch}`, {
        searchParams: { recursive: "1" },
      })
      .json<GitTreeResponse>();

    if (!data.tree || !Array.isArray(data.tree)) {
      throw new Error("Invalid repository tree data structure");
    }

    return TreeStructureSchema.parse({
      repoName: repoName,
      elements: new TreeBuilder(data.tree).build(),
    });
  }

  private validateSession(session: Session | null): void {
    if (!session) {
      throw new Error("Session is required");
    }
  }

  private validateAccessToken(accessToken: string | undefined): string {
    if (!accessToken) {
      throw new Error("Access token is required");
    }
    return accessToken;
  }

  private getSessionUsername(session: Session | null): string {
    if (!session?.user?.username) {
      throw new Error("Username is required");
    }
    return session.user.username;
  }
}