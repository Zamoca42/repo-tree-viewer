export interface InstallationInfo {
  id: number;
  account: {
    login: string;
    id: number;
  };
  app_id: number;
  target_type: string;
  permissions: {
    contents: string;
    metadata: string;
    [key: string]: string;
  };
  repository_selection: 'all' | 'selected';
}

export interface Repository {
  id: number;
  name: string;
  private: boolean;
  html_url: string;
  default_branch: string;
  fork: boolean;
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

export type ErrorMessageProps = {
  title: string;
  message: string;
  action?: React.ReactNode;
};

