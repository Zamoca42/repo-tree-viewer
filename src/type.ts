export interface Repository {
  id: number;
  name: string;
  private: boolean;
  html_url: string;
  default_branch: string;
}

export interface GitTreeItem {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

export interface GitTreeResponse {
  sha: string;
  url: string;
  tree: GitTreeItem[];
}
