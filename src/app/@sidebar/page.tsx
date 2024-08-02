import { auth } from "@/lib/auth";
import { fetchRepositories } from "@/lib/github";
import { GitBranch } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (!session) return null;

  const repos = await fetchRepositories();

  return (
    <nav className="mt-4">
      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-600">
          Your Repositories
        </h2>
      </div>
      <ul className="space-y-2">
        {repos.map((repo) => (
          <li
            key={repo.id}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <Link
              href={`/repo/${repo.name}?branch=${repo.default_branch}`}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer block"
            >
              <GitBranch className="inline mr-2" size={18} />
              {repo.name}
              {repo.private && (
                <span className="ml-2 text-xs text-gray-500">(Private)</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
