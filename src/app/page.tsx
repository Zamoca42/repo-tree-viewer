export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <h1>Welcome to GitHub Repository Tree Viewer</h1>
          <p>
            Select a repository from the sidebar to view its tree structure.
          </p>
        </div>
      </div>
    </div>
  );
}
