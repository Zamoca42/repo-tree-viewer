"use client";

import { FolderTree, LogOut, GitBranch, LogIn } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold flex items-center">
            <FolderTree className="mr-2" />
            Repo Tree Viewer
          </h1>
        </div>
        <nav className="mt-4">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-2">
                <h2 className="text-sm font-semibold text-gray-600">
                  Your Repositories
                </h2>
              </div>
              <ul className="space-y-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <GitBranch className="inline mr-2" size={18} />
                  Repository 1
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <GitBranch className="inline mr-2" size={18} />
                  Repository 2
                </li>
              </ul>
            </>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-600">
              Sign in to view your repositories
            </div>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Repository Tree
            </h2>
            <button
              onClick={toggleLogin}
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
              {isLoggedIn ? (
                <>
                  <Image
                    src="https://github.com/github.png"
                    alt="User"
                    className="h-8 w-8 rounded-full mr-2"
                  />
                  User Name
                  <LogOut className="ml-2" size={18} />
                </>
              ) : (
                <>
                  Sign in with GitHub
                  <LogIn className="ml-2" size={18} />
                </>
              )}
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
