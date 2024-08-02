"use client";

import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export function LoginButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
    >
      Sign in with GitHub
      <LogIn size={18} />
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 ml-4"
    >
      <LogOut size={18} />
    </button>
  );
}
