import { auth } from "@/lib/auth";
import { fetchRepositories } from "@/lib/github";
import { Sidebar } from "@/component/sidebar";

export default async function SidebarPage() {
  const session = await auth();

  if (!session) return null;

  const repos = await fetchRepositories();

  return <Sidebar repos={repos} />;
}
