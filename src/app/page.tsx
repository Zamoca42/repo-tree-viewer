import { LoginButton, LogoutButton } from "@/component/auth-button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Repository Tree
          </h2>
          {session ? (
            <div className="flex items-center space-x-2">
              <img
                src={session.user?.image ?? ""}
                alt={session.user?.name ?? ""}
                className="h-8 w-8 rounded-full"
              />
              <span>{session.user?.name}</span>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </header>
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
    </>
  );
}
