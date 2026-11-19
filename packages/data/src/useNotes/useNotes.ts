"use client";

import { useCreateNoteMutation } from "@repo/api";
import { useState } from "react";

export type NoteFormValues = {
  title: string;
  body: string;
};

export function useNotes() {
  const [createError, setCreateError] = useState<string | null>(null);
  const createNoteMutation = useCreateNoteMutation({
    onSuccess: () => {
      setCreateError(null);
    },
    onError: (error: Error) => {
      setCreateError(error.message);
    },
  });

  const createNote = async (values: NoteFormValues) => {
    await createNoteMutation.mutateAsync({ input: values });
  };

  return {
    createError,
    createNote,
    isCreating: createNoteMutation.isPending,
  };
}
