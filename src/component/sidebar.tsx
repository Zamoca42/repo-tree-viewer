import { processRepositories } from "@/lib/handler";
import { Repository } from "@/type";
import { GitBranch, GitFork, Lock, Unlock } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/component/ui/accordion";

export async function Sidebar({ repos }: { repos: Repository[] }) {
  const reposWithTreeData = await processRepositories(repos);

  const publicRepos = reposWithTreeData.filter(
    (repo) => !repo.private && !repo.fork
  );
  const privateRepos = reposWithTreeData.filter((repo) => repo.private);
  const forkRepos = reposWithTreeData.filter((repo) => repo.fork);

  const renderRepoList = (repoList: typeof reposWithTreeData) => (
    <ul className="space-y-2">
      {repoList.map((repo) => (
        <li
          key={repo.id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {repo.compressedContext ? (
            <Link
              href={`/repo?tree=${repo.compressedContext}`}
              className="flex items-center text-responsive"
            >
              {repo.fork ? (
                <GitFork className="mr-2 flex-shrink-0" size={18} />
              ) : repo.private ? (
                <Lock className="mr-2 flex-shrink-0" size={18} />
              ) : (
                <Unlock className="mr-2 flex-shrink-0" size={18} />
              )}
              <span className="truncate flex-1">{repo.name}</span>
            </Link>
          ) : (
            <span className="flex items-center text-responsive text-gray-400">
              {repo.fork ? (
                <GitFork className="mr-2 flex-shrink-0" size={18} />
              ) : repo.private ? (
                <Lock className="mr-2 flex-shrink-0" size={18} />
              ) : (
                <Unlock className="mr-2 flex-shrink-0" size={18} />
              )}
              <span className="truncate flex-1">
                {repo.name} (Error loading)
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav>
      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-600">
          Your Repositories
        </h2>
      </div>
      <div className="h-[90vh] overflow-y-auto px-2">
        <Accordion type="multiple" defaultValue={["public"]}>
          <AccordionItem value="public">
            <AccordionTrigger>
              Public ({publicRepos.length})
            </AccordionTrigger>
            <AccordionContent>{renderRepoList(publicRepos)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="private">
            <AccordionTrigger>
              Private ({privateRepos.length})
            </AccordionTrigger>
            <AccordionContent>{renderRepoList(privateRepos)}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="fork">
            <AccordionTrigger>
              Forked ({forkRepos.length})
            </AccordionTrigger>
            <AccordionContent>{renderRepoList(forkRepos)}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </nav>
  );
}
