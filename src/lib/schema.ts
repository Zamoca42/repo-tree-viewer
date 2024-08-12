import { TreeViewElement } from "@/component/tree-view-api";
import { z } from "zod";

export const urlSafeBase64Pattern = /^[A-Za-z0-9_-]*$/;

export const TreeViewElementSchema: z.ZodType<TreeViewElement> = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    isSelectable: z.boolean(),
    children: z.array(TreeViewElementSchema).optional(),
  })
);

export const TreeStructureSchema = z.object({
  repoName: z.string(),
  elements: z.array(TreeViewElementSchema),
});
