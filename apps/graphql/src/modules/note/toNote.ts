import type { Note } from "../../generated/graphql";

import type { NoteRecord } from "./notesStore";

export function toNote(record: NoteRecord): Note {
  return {
    id: record.id,
    title: record.title,
    body: record.body,
    createdAt: record.createdAt.toISOString(),
  };
}
