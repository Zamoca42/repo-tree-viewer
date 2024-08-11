"use client";

import { useSearchParams } from "next/navigation";
import { Checkbox } from "@/component/ui/checkbox";
import { useTreeView } from "@/context/view-filter";
import { decodeTreeViewElement } from "@/lib/converter";
import { useMemo, useState } from "react";
import { Button } from "@/component/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import {
  ClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { convertTreeToMarkdown } from "@/lib/markdown";
import { TreeViewElement } from "@/component/tree-view-api";

type RepoHeaderProps = {
  treeData: string | TreeViewElement[];
};

export function RepoHeader({ treeData }: RepoHeaderProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("n");
  const tree = searchParams.get("t");
  const { showIcons, showFiles, setShowIcons, setShowFiles } = useTreeView();
  const [isCopied, setIsCopied] = useState(false);

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

  const markdownTree = useMemo(() => {
    if (typeof treeData === "string") {
      const decodedData = decodeTreeViewElement(treeData);
      return convertTreeToMarkdown(decodedData.treeData, showIcons, showFiles);
    } else {
      return convertTreeToMarkdown(treeData, showIcons, showFiles);
    }
  }, [treeData, showIcons, showFiles]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdownTree);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdownTree], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${repoName}-tree.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

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
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={copyToClipboard}>
                <ClipboardIcon className="mr-2 h-4 w-4" />
                {isCopied ? "Copied!" : "Copy to Clipboard"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={downloadMarkdown}>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareUrl}>
                <LinkIcon className="mr-2 h-4 w-4" />
                Share URL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
