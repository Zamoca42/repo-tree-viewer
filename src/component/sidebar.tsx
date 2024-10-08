"use client";

import { LoginButton, LogoutButton } from "@/component/auth-button";
import Image from "next/image";
import { Repository } from "@/type";
import { GitFork, Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/component/ui/accordion";
import { Session } from "next-auth";

export function Sidebar({
  session,
  repos,
}: {
  session: Session | null;
  repos: Repository[];
}) {
  const router = useRouter();
  const [loadingRepo, setLoadingRepo] = useState<string | null>(null);

  const publicRepos = repos.filter((repo) => !repo.private && !repo.fork);
  const privateRepos = repos.filter((repo) => repo.private);
  const forkRepos = repos.filter((repo) => repo.fork);

  const handleRepoClick = async (repo: Repository) => {
    setLoadingRepo(repo.name);
    try {
      router.push(`/repo?n=${repo.name}&b=${repo.default_branch}`);
    } catch (error) {
      console.error("Error loading repo:", error);
    } finally {
      setLoadingRepo(null);
    }
  };

  const renderRepoList = (repoList: Repository[]) => (
    <ul className="space-y-2">
      {repoList.map((repo) => (
        <li
          key={repo.id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleRepoClick(repo)}
        >
          <div className="flex items-center text-responsive">
            {repo.fork ? (
              <GitFork className="mr-2 flex-shrink-0" size={18} />
            ) : repo.private ? (
              <Lock className="mr-2 flex-shrink-0" size={18} />
            ) : (
              <Unlock className="mr-2 flex-shrink-0" size={18} />
            )}
            <span className="truncate flex-1">
              {repo.name}
              {loadingRepo === repo.name && " (로딩 중...)"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="flex flex-col h-[94vh]">
      <div className="flex-grow overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-600">
            Your Repositories
          </h2>
        </div>
        <Accordion type="multiple" defaultValue={["public"]}>
          <AccordionItem value="public">
            <AccordionTrigger>Public ({publicRepos.length})</AccordionTrigger>
            <AccordionContent>{renderRepoList(publicRepos)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="private">
            <AccordionTrigger>Private ({privateRepos.length})</AccordionTrigger>
            <AccordionContent>{renderRepoList(privateRepos)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="fork">
            <AccordionTrigger>Forked ({forkRepos.length})</AccordionTrigger>
            <AccordionContent>{renderRepoList(forkRepos)}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-4 border-t">
        {session ? (
          <div className="flex items-center space-x-2">
            <Image
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
            <span className="md:block hidden">{session.user?.name}</span>
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}