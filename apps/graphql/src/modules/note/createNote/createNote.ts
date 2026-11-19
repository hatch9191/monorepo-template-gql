import { normaliseNoteTitle } from "@repo/domain";
import { GraphQLError } from "graphql";

import type { Note } from "../../../generated/graphql";

import type { NotesStore } from "../notesStore";
import { toNote } from "../toNote";

type CreateNoteInput = {
  title: string;
  body: string;
};

export async function createNote(
  notes: NotesStore,
  input: CreateNoteInput,
): Promise<Note> {
  const title = normaliseNoteTitle(input.title);

  if (title.length === 0) {
    throw new GraphQLError("A title is required.");
  }

  const record = await notes.create({
    title,
    body: input.body,
  });

  return toNote(record);
}
