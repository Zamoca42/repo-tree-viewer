"use client";

import { useSearchParams } from "next/navigation";
import { useTreeView } from "@/context/view-filter";
import { useMemo, useState } from "react";
import { TreeViewElement } from "@/component/tree-view-api";
import { RepoHeaderDropdown } from "@/component/menu";
import { RepoViewOptions } from "./filter";
import { downloadMarkdown, generateMarkdownTree } from "@/lib/markdown";
import { copyToClipboard, generateShareableUrl } from "@/lib/share";
import { getRepoName } from "@/lib/converter";

type RepoHeaderProps = {
  treeData: string | TreeViewElement[];
};

export function RepoHeader({ treeData }: RepoHeaderProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("n");
  const branch = searchParams.get("b");
  const tree = searchParams.get("t");
  const { showIcons, showFiles, setShowIcons, setShowFiles } = useTreeView();
  const [isCopied, setIsCopied] = useState(false);

  const repoName = useMemo(() => getRepoName(tree, name), [tree, name]);

  const markdownTree = useMemo(
    () => generateMarkdownTree(treeData, showIcons, showFiles),
    [treeData, showIcons, showFiles]
  );

  const handleCopyToClipboard = async () => {
    try {
      await copyToClipboard(markdownTree);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownloadMarkdown = () => {
    downloadMarkdown(markdownTree, `${repoName}-tree.md`);
  };

  const handleShareUrl = async () => {
    try {
      const sharedUrl = await generateShareableUrl(name, branch, tree);
      await copyToClipboard(sharedUrl);
      alert(
        `Shareable URL copied to clipboard! (${sharedUrl.length} characters)`
      );
    } catch (error) {
      console.error("Error generating shareable URL:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to generate shareable URL. Please try again.");
      }
    }
  };

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Repository: {repoName}</h2>
          <RepoViewOptions
            showIcons={showIcons}
            showFiles={showFiles}
            setShowIcons={setShowIcons}
            setShowFiles={setShowFiles}
          />
          <RepoHeaderDropdown
            isCopied={isCopied}
            onCopyToClipboard={handleCopyToClipboard}
            onDownloadMarkdown={handleDownloadMarkdown}
            onShareUrl={handleShareUrl}
          />
        </div>
      </div>
    </header>
  );
}
