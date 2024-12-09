import { AppSidebar } from "@/component/sidebar/app-sidebar";
import { getSidebarData } from "@/lib/sidebar";

export default async function SidebarPage() {
  const { user, publicRepo } = await getSidebarData();
  return <AppSidebar user={user} publicRepo={publicRepo} />;
}
