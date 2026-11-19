"use client";

import { type NoteFormValues, useNotes } from "@repo/data";
import { usePlatformRouter } from "@repo/platform";

import { CreateNoteFields } from "@/components/molecules/CreateNoteFields/CreateNoteFields";

export function CreateNoteForm() {
  const { refresh } = usePlatformRouter();
  const { createError, createNote, isCreating } = useNotes();

  const handleCreate = async (values: NoteFormValues) => {
    await createNote(values);
    refresh();
  };

  return (
    <CreateNoteFields
      createError={createError}
      isCreating={isCreating}
      onCreate={handleCreate}
    />
  );
}
