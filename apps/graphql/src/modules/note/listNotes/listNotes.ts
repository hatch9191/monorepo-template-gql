import type { Note } from "../../../generated/graphql";

import type { NotesStore } from "../notesStore";
import { toNote } from "../toNote";

export async function listNotes(notes: NotesStore): Promise<Note[]> {
  const records = await notes.findMany();

  return records.map(toNote);
}
