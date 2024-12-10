export const MAX_URL_LENGTH = 8200;
export const APP_TITLE = "GitHub Repo Tree Viewer";
export const APP_DESCRIPTION = "Visualize your GitHub repos as ASCII trees";
export const FEEDBACK_EMAIL = "contact@choo.ooo";
export const GITHUB_REPO_URL = "https://github.com/Zamoca42/repo-tree-viewer";
export const BASE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
