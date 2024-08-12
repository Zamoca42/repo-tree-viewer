import { Checkbox } from "@/component/ui/checkbox";

type RepoViewOptionsProps = {
  showIcons: boolean;
  showFiles: boolean;
  setShowIcons: (value: boolean) => void;
  setShowFiles: (value: boolean) => void;
};

export function RepoViewOptions({
  showIcons,
  showFiles,
  setShowIcons,
  setShowFiles,
}: RepoViewOptionsProps) {
  return (
    <div className="flex items-center space-x-4">
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
  );
}
