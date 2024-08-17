import { CenteredMessage } from "@/component/message";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <CenteredMessage height="custom" border="dashed">
        <h1 className="message-title">
          Welcome to GitHub Repository Tree Viewer
        </h1>
        <p>
          Select a repository from the sidebar to view its tree structure.
        </p>
        <Link
          href="https://github.com/Zamoca42/repo-tree-viewer"
          className="mt-4 inline-flex items-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/github.svg"
            alt="GitHub"
            width={24}
            height={24}
            className="mr-2"
          />
          View project on GitHub
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          ⚠️ We do not store any of your personal information or GitHub data.
        </p>
      </CenteredMessage>
    </div>
  );
}
