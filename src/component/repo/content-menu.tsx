"use client";

import { copyToClipboard, downloadMarkdown } from "@/lib/share";
import { RepoViewOptions } from "@/component/repo/filter";
import { TreeViewElement } from "@/component/tree-view-api";
import { useMemo, useState } from "react";
import { useTreeView } from "@/context/view-filter";
import { MarkdownTreeGenerator } from "@/lib/markdown";
import { RepoContentDropdown } from "@/component/repo/repo-dropdown";

interface RepoContentMenuProps {
  treeStructure: TreeViewElement[];
  repoName: string;
}

export function RepoContentMenu({
  treeStructure,
  repoName,
}: RepoContentMenuProps) {
  const { showIcons, showFiles, setShowIcons, setShowFiles } = useTreeView();
  const [isCopied, setIsCopied] = useState(false);

  const markdownTree = useMemo(
    () =>
      new MarkdownTreeGenerator(treeStructure, showIcons, showFiles).generate(),
    [treeStructure, showIcons, showFiles]
  );

  const handleCopyToClipboard = async () => {
    if (!markdownTree) {
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
    if (!markdownTree) {
      alert("No content to download. The tree is empty.");
      return;
    }
    downloadMarkdown(markdownTree, `${repoName}-tree.md`);
  };

  return (
    <div className="flex items-center justify-end gap-2 px-2 pt-4">
      <RepoViewOptions
        showIcons={showIcons}
        showFiles={showFiles}
        setShowIcons={setShowIcons}
        setShowFiles={setShowFiles}
      />
      <RepoContentDropdown
        isCopied={isCopied}
        onCopyToClipboard={handleCopyToClipboard}
        onDownloadMarkdown={handleDownloadMarkdown}
      />
    </div>
  );
}
