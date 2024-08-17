import { Sidebar } from "@/component/sidebar";
import { auth } from "@/lib/auth";
import { fetchRepositories } from "@/lib/github";

export default async function SidebarPage() {
  const session = await auth();
  const repos = session ? await fetchRepositories() : [];

  return <Sidebar session={session} repos={repos} />;
}
