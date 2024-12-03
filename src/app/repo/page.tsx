import { RepoTreeContent } from "@/component/content";
import { RepoHeader } from "@/component/header";
import { TreeSkeletonLoader } from "@/component/loader";
import { auth } from "@/lib/auth";
import { getTreeFromRepo } from "@/lib/repo";
import { TreeStructureSchema } from "@/lib/schema";
import { Suspense } from "react";
import { z } from "zod";

export default async function RepoPage({
  searchParams,
}: {
  searchParams: { n?: string; b?: string };
}) {
  const { n: name, b: branch } = searchParams;
  const session = await auth();

  let treeStructure: z.infer<typeof TreeStructureSchema>;

  if (name && branch) {
    treeStructure = await getTreeFromRepo(name, branch, session);
  } else {
    throw new Error("Invalid Parameters");
  }

  return (
    <>
      <RepoHeader
        name={treeStructure.repoName}
        treeStructure={treeStructure.elements}
      />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<TreeSkeletonLoader />}>
          <RepoTreeContent
            treeStructure={treeStructure.elements}
            repoName={treeStructure.repoName}
          />
        </Suspense>
      </div>
    </>
  );
}
