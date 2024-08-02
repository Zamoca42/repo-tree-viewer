import { GitBranch } from "lucide-react";

export default function Page() {
  return (
    <nav className="mt-4">
      <div className="px-4 py-2">
        <h2 className="text-sm font-semibold text-gray-600">
          Your Repositories
        </h2>
      </div>
      <ul className="space-y-2">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <GitBranch className="inline mr-2" size={18} />
          Repository 1
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <GitBranch className="inline mr-2" size={18} />
          Repository 2
        </li>
      </ul>
    </nav>
  );
}
