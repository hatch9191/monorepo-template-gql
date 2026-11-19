import { collapseWhitespace } from "@repo/utils";

export function normaliseNoteTitle(title: string): string {
  return collapseWhitespace(title);
}
