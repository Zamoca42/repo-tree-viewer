"use client";

import { signIn, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginButton() {
  return (
    <button onClick={() => signIn("github")} className="btn-auth space-x-2">
      <span className="hidden-mobile">Sign in with GitHub</span>
      <LogIn size={18} />
    </button>
  );
}

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <button onClick={handleLogout} className="btn-auth ml-4">
      <LogOut size={18} />
    </button>
  );
}
