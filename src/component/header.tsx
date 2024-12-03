"use client";

import { useTreeView } from "@/context/view-filter";
import { useMemo, useState } from "react";
import { TreeViewElement } from "@/component/tree-view-api";
import { RepoHeaderDropdown } from "@/component/menu";
import { RepoViewOptions } from "./filter";
import { downloadMarkdown, generateMarkdownTree } from "@/lib/markdown";
import { copyToClipboard } from "@/lib/share";

type RepoHeaderProps = {
  name: string;
  treeStructure: TreeViewElement[];
};

export function RepoHeader({ name, treeStructure }: RepoHeaderProps) {
  const { showIcons, showFiles, setShowIcons, setShowFiles } = useTreeView();
  const [isCopied, setIsCopied] = useState(false);

  const repoName = name ? `Repository: ${name}` : "Repository Tree";

  const markdownTree = useMemo(
    () => generateMarkdownTree(treeStructure, showIcons, showFiles),
    [treeStructure, showIcons, showFiles]
  );

  const handleCopyToClipboard = async () => {
    if (markdownTree === null) {
      alert("No content to copy. The tree is empty.");
      return;
    }

    try {
      await copyToClipboard(markdownTree);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownloadMarkdown = () => {
    if (markdownTree === null) {
      alert("No content to download. The tree is empty.");
      return;
    }
    downloadMarkdown(markdownTree, `${repoName}-tree.md`);
  };

  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">{repoName}</h2>
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
          />
        </div>
      </div>
    </header>
  );
}
