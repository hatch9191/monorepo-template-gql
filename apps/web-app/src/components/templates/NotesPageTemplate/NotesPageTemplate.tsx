"use client";

import { useNotes } from "@repo/data";
import { ListRenderer, Show } from "@repo/ui";
import { Button } from "@repo/ui/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { type FormEvent, useState } from "react";

import { PATHS } from "@/constants/paths";

export function NotesPageTemplate() {
  const { notes, status, createError, createNote, isCreating } = useNotes();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNote({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-6 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
        <p className="text-muted-foreground">
          Write a note and it stays in the list.
        </p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        action={PATHS.HOME}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="body">Body</FieldLabel>
            <Input
              id="body"
              name="body"
              value={body}
              onChange={(event) => {
                setBody(event.target.value);
              }}
            />
          </Field>
        </FieldGroup>
        <Button type="submit" disabled={isCreating}>
          Create
        </Button>
        <Show when={createError}>
          {(message) => <p className="text-sm text-destructive">{message}</p>}
        </Show>
      </form>
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
