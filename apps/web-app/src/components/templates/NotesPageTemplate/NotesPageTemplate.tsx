import { ListRenderer, Show } from "@repo/ui";
import type { ReactNode } from "react";

import { CreateNoteForm } from "@/components/organisms/CreateNoteForm/CreateNoteForm";

export type NotesPageNote = {
  id: string;
  title: string;
  body: string;
};

export type NotesPageStatus = "ready" | "error";

export type NotesPageTemplateProps = {
  notes: readonly NotesPageNote[];
  status: NotesPageStatus;
  form?: ReactNode;
};

export function NotesPageTemplate({
  notes,
  status,
  form = <CreateNoteForm />,
}: NotesPageTemplateProps) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
        <p className="text-muted-foreground">
          Write a note and it stays in the list.
        </p>
      </div>
      {form}
      <Show when={status === "error"}>
        {() => (
          <p className="text-sm text-muted-foreground">
            Notes are unavailable right now.
          </p>
        )}
      </Show>
      <ul className="flex flex-col gap-3">
        <ListRenderer
          items={notes}
          keyOverride={(note) => note.id}
          render={(note) => (
            <li className="rounded-lg border border-border bg-card p-4">
              <p className="font-medium">{note.title}</p>
              <p className="text-sm text-muted-foreground">{note.body}</p>
            </li>
          )}
        />
      </ul>
    </main>
  );
}
