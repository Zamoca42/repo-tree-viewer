import { NextRequest, NextResponse } from "next/server";
import { getCompressedContext } from "@/lib/handler";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const branch = searchParams.get("branch");

  if (!name || !branch) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const compressedContext = await getCompressedContext(name, branch);
    return NextResponse.json({ compressedContext });
  } catch (error) {
    console.error("Error getting compressed context:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
