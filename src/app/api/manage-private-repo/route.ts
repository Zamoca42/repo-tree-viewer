import { auth } from "@/lib/auth";
import { GitHubClient } from "@/lib/github";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const githubClient = new GitHubClient(session);
    

    return Response.redirect(
      githubClient.getAppInstallUrl()
    );
  } catch (error) {
    console.error("Failed to check GitHub App installation:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}