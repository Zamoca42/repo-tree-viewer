import { auth } from "@/lib/auth";
import { fetchRepositories } from "@/lib/github";
import { GitBranch } from "lucide-react";
import Link from "next/link";

export default async function Sidebar() {
  const session = await auth();

  if (!session) return null;

  const repos = await fetchRepositories();

  return (
    <nav>
      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-600">
          Your Repositories
        </h2>
      </div>
      <div className="h-[90vh] overflow-y-auto">
        <ul className="space-y-2">
          {repos.map((repo) => (
            <li
              key={repo.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <Link
                href={`/repo/${repo.name}?branch=${repo.default_branch}`}
                className="flex items-center"
              >
                <GitBranch className="mr-2 flex-shrink-0" size={18} />
                <span className="truncate flex-1">{repo.name}</span>
                {repo.private && (
                  <span className="ml-2 text-xs text-muted-foreground flex-shrink-0 hidden-mobile">
                    (Private)
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
