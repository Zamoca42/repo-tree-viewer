"use client";

import {
  BookOpen,
  LogIn,
  BookCopy,
  FolderTree,
  BookLock,
  Send,
  Settings,
} from "lucide-react";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/component/ui/sidebar";
import { Repository, User } from "@/type";
import { NavRepository } from "@/component/sidebar/nav-repository";
import { NavMenus } from "@/component/sidebar/nav-menus";
import { NavUser } from "@/component/sidebar/nav-user";
import { signIn } from "next-auth/react";
import { GitHubIcon } from "@/component/icon";
import { BASE_URL, FEEDBACK_EMAIL, GITHUB_REPO_URL } from "@/lib/constant";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
  publicRepo: Repository[];
}

const transformRepos = (repos: Repository[], isFork: boolean) => {
  return repos
    .filter((repo) => repo.fork === isFork)
    .map((repo) => ({
      title: repo.name,
      url: `${repo.name}?b=${repo.default_branch}`,
    }));
};

export function AppSidebar({ user, publicRepo, ...props }: AppSidebarProps) {
  const ownedRepos = transformRepos(publicRepo, false);
  const forkedRepos = transformRepos(publicRepo, true);
  const data = {
    repo: [
      {
        title: "Owned",
        url: "owned",
        icon: BookOpen,
        items: ownedRepos,
        badge: ownedRepos.length,
      },
      {
        title: "Forked",
        url: "forked",
        icon: BookCopy,
        items: forkedRepos,
        badge: forkedRepos.length,
      },
      {
        title: "Private",
        url: "private",
        icon: BookLock,
        items: [],
        badge: 0,
      },
    ],
    menu: [
      {
        title: "Feedback",
        url: `mailto:${FEEDBACK_EMAIL}`,
        icon: Send,
      },
      {
        title: "View on GitHub",
        url: GITHUB_REPO_URL,
        icon: GitHubIcon,
      },
      {
        title: "Manage Private Repository",
        url: `${BASE_URL}/api/manage-private-repo`,
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <FolderTree className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Repo Tree Viewer
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavRepository items={data.repo} />
        <NavMenus items={data.menu} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={user} />
        ) : (
          <SidebarMenuButton onClick={() => signIn("github")}>
            <span>Sign in with GitHub</span>
            <LogIn />
          </SidebarMenuButton>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
