import { describe, expect, it } from "bun:test";
import { GraphQLError } from "graphql";

import type { NotesStore } from "../notesStore";
import { createNote } from "./createNote";

const createdAt = new Date("2026-01-01T00:00:00.000Z");

function storeWithCreate(): NotesStore {
  return {
    findMany: async () => [],
    create: async (input) => {
      return {
        id: "note-1",
        title: input.title,
        body: input.body,
        createdAt,
      };
    },
  };
}

describe(createNote.name, () => {
  it("rejects a blank title", async () => {
    let created = false;
    const notes: NotesStore = {
      findMany: async () => [],
      create: async () => {
        created = true;
        return { id: "note-1", title: "", body: "", createdAt };
      },
    };

    await expect(
      createNote(notes, { title: "   ", body: "Hello" }),
    ).rejects.toBeInstanceOf(GraphQLError);
    expect(created).toEqual(false);
  });

  it("stores a normalised title", async () => {
    const expected = {
      id: "note-1",
      title: "Week notes",
      body: "Bring the list",
      createdAt: createdAt.toISOString(),
    };
    const result = await createNote(storeWithCreate(), {
      title: "  Week   notes ",
      body: "Bring the list",
    });

    expect(result).toEqual(expected);
  });
});
