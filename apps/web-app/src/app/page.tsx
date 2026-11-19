import {
  type IListNotesQuery,
  type IListNotesQueryVariables,
  ListNotesDocument,
} from "@repo/api";
import type { Metadata } from "next";
import { cache } from "react";

import { NotesPageTemplate } from "@/components/templates/NotesPageTemplate/NotesPageTemplate";
import { customFetcher } from "@/lib/graphql";

export const dynamic = "force-dynamic";

type NotesPageData = {
  notes: IListNotesQuery["notes"];
  status: "ready" | "error";
};

const getNotes = cache(async (): Promise<NotesPageData> => {
  try {
    const data = await customFetcher<IListNotesQuery, IListNotesQueryVariables>(
      ListNotesDocument,
    )();

    return {
      notes: data.notes,
      status: "ready",
    };
  } catch {
    return {
      notes: [],
      status: "error",
    };
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const { notes, status } = await getNotes();

  if (status === "error") {
    return {
      title: "Notes",
    };
  }

  const count = notes.length;
  const noun = count === 1 ? "note" : "notes";

  return {
    title: `${count} ${noun}`,
  };
}

export default async function HomePage() {
  const { notes, status } = await getNotes();

  return <NotesPageTemplate notes={notes} status={status} />;
}
