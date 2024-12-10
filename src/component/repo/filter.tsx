import { Checkbox } from "@/component/ui/checkbox";

type CheckboxOptionProps = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

function CheckboxOption({
  id,
  label,
  checked,
  onCheckedChange,
}: CheckboxOptionProps) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

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
      <CheckboxOption
        id="show-icons"
        label="Show Icons"
        checked={showIcons}
        onCheckedChange={setShowIcons}
      />
      <CheckboxOption
        id="show-files"
        label="Show Files"
        checked={showFiles}
        onCheckedChange={setShowFiles}
      />
    </div>
  );
}
