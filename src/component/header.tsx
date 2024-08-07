"use client";

import { usePathname } from "next/navigation";
import { LoginButton, LogoutButton } from "@/component/auth-button";
import Image from "next/image";
import { Session } from "next-auth";

export function RepoHeader({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const repoName = pathname.split("/")[2]; // Assuming the path is /repo/[name]

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {repoName ? `Repository: ${repoName}` : "Repository Tree"}
        </h2>
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
