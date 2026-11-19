import { describe, expect, it } from "bun:test";

import { executeGraphqlRequest } from "../__mocks__/server";
import type { NotesStore } from "../modules/note/notesStore";

const createdAt = new Date("2026-01-03T00:00:00.000Z");

function notesStore(): NotesStore {
  return {
    findMany: async () => [
      { id: "note-1", title: "Hello", body: "There", createdAt },
    ],
    create: async () => {
      throw new Error("create should not run");
    },
  };
}

describe("notes", () => {
  it("returns the stored notes", async () => {
    const query = /* GraphQL */ `
      query Notes {
        notes {
          id
          title
          body
          createdAt
        }
      }
    `;
    const expected = {
      notes: [
        {
          id: "note-1",
          title: "Hello",
          body: "There",
          createdAt: "2026-01-03T00:00:00.000Z",
        },
      ],
    };
    const result = await executeGraphqlRequest<{ notes: unknown }>({
      query,
      context: { notes: notesStore() },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual(expected);
  });

  it("returns an error when the title is blank", async () => {
    const mutation = /* GraphQL */ `
      mutation CreateNote($input: CreateNoteInput!) {
        createNote(input: $input) {
          id
        }
      }
    `;
    const result = await executeGraphqlRequest({
      query: mutation,
      variables: { input: { title: "   ", body: "Hello" } },
      context: { notes: notesStore() },
    });

    expect(result.errors?.[0]?.message).toEqual("A title is required.");
  });
});
