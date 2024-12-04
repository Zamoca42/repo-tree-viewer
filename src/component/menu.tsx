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
  MoreHorizontalIcon,
} from "lucide-react";

type RepoHeaderDropdownProps = {
  isCopied: boolean;
  onCopyToClipboard: () => void;
  onDownloadMarkdown: () => void;
};

export function RepoHeaderDropdown({
  isCopied,
  onCopyToClipboard,
  onDownloadMarkdown,
}: RepoHeaderDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onCopyToClipboard}>
          <ClipboardIcon className="mr-2 h-4 w-4" />
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDownloadMarkdown}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
