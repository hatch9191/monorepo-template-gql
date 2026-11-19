"use client";

import { Show } from "@repo/ui";
import { Button } from "@repo/ui/components/atoms/button";
import { Input } from "@repo/ui/components/atoms/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/molecules/field";
import { type FormEvent, useState } from "react";

import { PATHS } from "@/constants/paths";

export type CreateNoteValues = {
  title: string;
  body: string;
};

type CreateNoteFieldsProps = {
  createError: string | null;
  isCreating: boolean;
  onCreate: (values: CreateNoteValues) => Promise<void> | void;
  defaultTitle?: string;
  defaultBody?: string;
};

export function CreateNoteFields({
  createError,
  isCreating,
  onCreate,
  defaultTitle = "",
  defaultBody = "",
}: CreateNoteFieldsProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [body, setBody] = useState(defaultBody);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await onCreate({ title, body });
    } catch {
      return;
    }

    setTitle("");
    setBody("");
  };

  return (
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
  );
}
