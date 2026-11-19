import { describe, expect, it } from "bun:test";

import type { NotesStore } from "../notesStore";
import { listNotes } from "./listNotes";

describe(listNotes.name, () => {
  it("maps createdAt to an ISO string", async () => {
    const createdAt = new Date("2026-01-02T03:04:05.000Z");
    const notes: NotesStore = {
      findMany: async () => [
        { id: "note-1", title: "Hello", body: "There", createdAt },
      ],
      create: async (input) => {
        return { id: "note-2", ...input, createdAt };
      },
    };
    const expected = [
      {
        id: "note-1",
        title: "Hello",
        body: "There",
        createdAt: "2026-01-02T03:04:05.000Z",
      },
    ];
    const result = await listNotes(notes);

    expect(result).toEqual(expected);
  });
});
