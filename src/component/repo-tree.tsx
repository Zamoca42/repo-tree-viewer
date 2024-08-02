interface TreeItem {
  path: string;
  type: string;
}

interface RepoTreeProps {
  tree: TreeItem[];
}

export const RepoTree = ({ tree }: RepoTreeProps) => {
  if (!tree || !Array.isArray(tree)) {
    return <div>No tree data available</div>;
  }

  const renderTree = (items: TreeItem[], path: string = "") => {
    const filteredItems = items.filter((item) => {
      const itemPath = item.path.split("/");
      return (
        itemPath.length === path.split("/").length + 1 &&
        item.path.startsWith(path)
      );
    });

    return (
      <ul className="pl-4">
        {filteredItems.map((item) => (
          <li key={item.path} className="py-1">
            {item.path.split("/").pop()}
            {item.type === "tree" && renderTree(tree, item.path)}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="mt-4">{renderTree(tree)}</div>;
};
