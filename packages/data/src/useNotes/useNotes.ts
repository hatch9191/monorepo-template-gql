"use client";

import { useCreateNoteMutation, useListNotesQuery } from "@repo/api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export type NoteFormValues = {
  title: string;
  body: string;
};

export function useNotes() {
  const queryClient = useQueryClient();
  const list = useListNotesQuery(undefined, {
    retry: false,
  });
  const [createError, setCreateError] = useState<string | null>(null);
  const createNoteMutation = useCreateNoteMutation({
    onSuccess: async () => {
      setCreateError(null);
      await queryClient.invalidateQueries({
        queryKey: useListNotesQuery.getKey(),
      });
    },
    onError: (error: Error) => {
      setCreateError(error.message);
    },
  });

  const createNote = (values: NoteFormValues) => {
    createNoteMutation.mutate({ input: values });
  };

  return {
    notes: list.data?.notes ?? [],
    status: list.isPending ? "loading" : list.isError ? "error" : "ready",
    createError,
    createNote,
    isCreating: createNoteMutation.isPending,
  };
}
