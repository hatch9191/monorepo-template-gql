import { prisma } from "@repo/db";

import type { NotesStore } from "./notesStore";

export function prismaNotesStore(): NotesStore {
  return {
    findMany: () => {
      return prisma.note.findMany({
        orderBy: { createdAt: "desc" },
      });
    },
    create: (input) => {
      return prisma.note.create({
        data: input,
      });
    },
  };
}
