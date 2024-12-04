import { Sidebar } from "@/component/sidebar";
import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";

export default async function SidebarPage() {
  const session = await auth();
  if (!session) {
    return <Sidebar session={null} repos={[]} />;
  }

  const githubClient = new GitHubClient(session);
  const repos = await githubClient.getAllRepositories();

  return <Sidebar session={session} repos={repos} />;
}
