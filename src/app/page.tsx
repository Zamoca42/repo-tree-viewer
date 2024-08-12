import { CenteredMessage } from "@/component/message";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <CenteredMessage height="custom" border="dashed">
        <h1 className="message-title">
          Welcome to GitHub Repository Tree Viewer
        </h1>
        <p>Select a repository from the sidebar to view its tree structure.</p>
      </CenteredMessage>
    </div>
  );
}
