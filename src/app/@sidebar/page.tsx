import { Sidebar } from "@/component/sidebar";
import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";

export default async function SidebarPage() {
  const session = await auth();
  const githubClient = new GitHubClient(session);
  const repos = await githubClient.getRepositories();

  return <Sidebar session={session} repos={repos} />;
}
