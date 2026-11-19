import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { CreateNoteFields } from "@/components/molecules/CreateNoteFields/CreateNoteFields";
import {
  type NotesPageNote,
  type NotesPageStatus,
  NotesPageTemplate,
} from "./NotesPageTemplate";

const notes: NotesPageNote[] = [
  {
    id: "note-1",
    title: "Market",
    body: "Oat milk and coffee.",
  },
  {
    id: "note-2",
    title: "Draft",
    body: "Outline the notes example.",
  },
];

const onCreate = fn();

type NotesStoryProps = {
  notes: readonly NotesPageNote[];
  status: NotesPageStatus;
  createError: string | null;
  isCreating: boolean;
  defaultTitle: string;
  defaultBody: string;
  onCreate: (values: { title: string; body: string }) => Promise<void> | void;
};

function NotesStory({
  notes: noteList,
  status,
  createError,
  isCreating,
  defaultTitle,
  defaultBody,
  onCreate: handleCreate,
}: NotesStoryProps) {
  return (
    <NotesPageTemplate
      notes={noteList}
      status={status}
      form={
        <CreateNoteFields
          createError={createError}
          isCreating={isCreating}
          defaultTitle={defaultTitle}
          defaultBody={defaultBody}
          onCreate={handleCreate}
        />
      }
    />
  );
}

const meta = {
  title: "Notes",
  component: NotesStory,
  tags: ["autodocs"],
  args: {
    notes: [],
    status: "ready",
    createError: null,
    isCreating: false,
    defaultTitle: "",
    defaultBody: "",
    onCreate,
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The list and the form state are props. Stories do not call GraphQL or React Query.",
      },
    },
  },
} satisfies Meta<typeof NotesStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithNotes: Story = {
  args: {
    notes,
  },
};

export const Unavailable: Story = {
  args: {
    status: "error",
  },
};

export const CreateError: Story = {
  args: {
    notes,
    createError: "Title is required.",
    defaultTitle: "Market",
    defaultBody: "Oat milk",
  },
};

export const Creating: Story = {
  args: {
    notes,
    isCreating: true,
    defaultTitle: "Market",
    defaultBody: "Oat milk",
  },
};

export const Submit: Story = {
  play: async ({ canvasElement }) => {
    onCreate.mockClear();
    const canvas = within(canvasElement);
    const title = canvas.getByLabelText("Title");
    const body = canvas.getByLabelText("Body");

    await userEvent.type(title, "Market");
    await userEvent.type(body, "Oat milk");
    await userEvent.click(canvas.getByRole("button", { name: "Create" }));

    await expect(onCreate).toHaveBeenCalledWith({
      title: "Market",
      body: "Oat milk",
    });
    await expect(title).toHaveValue("");
    await expect(body).toHaveValue("");
  },
};

export const KeepsTheDraftWhenCreateFails: Story = {
  args: {
    onCreate: fn(async () => {
      throw new Error("Title is required.");
    }),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByLabelText("Title");
    const body = canvas.getByLabelText("Body");

    await userEvent.type(title, "Market");
    await userEvent.type(body, "Oat milk");
    await userEvent.click(canvas.getByRole("button", { name: "Create" }));

    await expect(title).toHaveValue("Market");
    await expect(body).toHaveValue("Oat milk");
  },
};
