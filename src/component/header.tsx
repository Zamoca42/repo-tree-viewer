"use client";

import { LoginButton, LogoutButton } from "@/component/auth-button";
import Image from "next/image";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/component/ui/checkbox";
import { useTreeView } from "@/context/view-filter";
import { decodeTreeViewElement } from "@/lib/converter";
import { useMemo } from "react";

type RepoHeaderProps = {
  session: Session | null;
};

export function RepoHeader({ session }: RepoHeaderProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("n");
  const tree = searchParams.get("t");
  const { showIcons, showFiles, setShowIcons, setShowFiles } = useTreeView();

  const repoName = useMemo(() => {
    if (tree) {
      try {
        const decodedData = decodeTreeViewElement(tree);
        return decodedData.repoName;
      } catch (error) {
        console.error("Error decoding tree data:", error);
        return "Error decoding repository name";
      }
    }
    return name ?? "Repository Tree";
  }, [name, tree]);

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Repository: {repoName}</h2>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-icons"
              checked={showIcons}
              onCheckedChange={(checked) => setShowIcons(checked as boolean)}
            />
            <label htmlFor="show-icons" className="text-sm">
              Show Icons
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-files"
              checked={showFiles}
              onCheckedChange={(checked) => setShowFiles(checked as boolean)}
            />
            <label htmlFor="show-files" className="text-sm">
              Show Files
            </label>
          </div>
        </div>
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
    </header>
  );
}
