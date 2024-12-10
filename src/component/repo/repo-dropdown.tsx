import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/component/ui/dropdown-menu";
import { ClipboardIcon, DownloadIcon, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/component/ui/button";

type RepoHeaderDropdownProps = {
  isCopied: boolean;
  onCopyToClipboard: () => void;
  onDownloadMarkdown: () => void;
};

export function RepoContentDropdown({
  isCopied,
  onCopyToClipboard,
  onDownloadMarkdown,
}: RepoHeaderDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="hover:bg-muted rounded-md">
        <Button variant="ghost" size="sm" className="h-7 w-7">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCopyToClipboard}>
          <ClipboardIcon className="h-4 w-4" />
          {isCopied ? <span>Copied!</span> : <span>Copy to Clipboard</span>}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDownloadMarkdown}>
          <DownloadIcon className="h-4 w-4" />
          <span>Download Markdown</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
