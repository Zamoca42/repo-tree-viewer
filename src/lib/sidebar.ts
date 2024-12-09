import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";
import { User } from "@/type";

export async function getSidebarData() {
  const session = await auth();
  
  if (!session) {
    return {
      user: null,
      publicRepo: []
    };
  }

  const user: User = {
    name: session.user.name!,
    email: session.user.email!,
    avatar: session.user.image!,
  };

  const githubClient = new GitHubClient(session);
  const publicRepo = await githubClient.getAllPublicRepositories();

  return {
    user,
    publicRepo
  };
}