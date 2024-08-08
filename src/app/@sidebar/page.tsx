import { Sidebar } from "@/component/sidebar";
import { auth } from "@/lib/auth";
import { fetchRepositories } from "@/lib/github";

export default async function SidebarPage() {
  const session = await auth();

  if (!session) return null;

  const repos = await fetchRepositories();

  return <Sidebar repos={repos} />;
}
