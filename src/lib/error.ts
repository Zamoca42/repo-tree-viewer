export class RepoError extends Error {
  title: string;
  action?: React.ReactNode;

  constructor(message: string, title: string, action?: React.ReactNode) {
    super(message);
    this.name = "RepoError";
    this.title = title;
    this.action = action;
  }
}
