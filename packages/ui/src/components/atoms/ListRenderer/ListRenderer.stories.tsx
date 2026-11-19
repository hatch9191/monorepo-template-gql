import type { Meta, StoryObj } from "@storybook/react-vite";

import { ListRenderer } from "./ListRenderer";

type NotePreview = {
  id: string;
  title: string;
  body: string;
};

function NoteList({ items }: { items: readonly NotePreview[] }) {
  return (
    <ul className="flex w-72 flex-col gap-3">
      <ListRenderer
        items={items}
        keyOverride={(item) => item.id}
        render={(item) => (
          <li className="rounded-lg border border-border bg-card p-4">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.body}</p>
          </li>
        )}
      />
    </ul>
  );
}

const meta = {
  title: "ListRenderer",
  component: NoteList,
  tags: ["autodocs"],
  args: {
    items: [],
  },
} satisfies Meta<typeof NoteList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: "Renders nothing when there are no items.",
      },
    },
  },
};

export const WithItems: Story = {
  args: {
    items: [
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
    ],
  },
};
