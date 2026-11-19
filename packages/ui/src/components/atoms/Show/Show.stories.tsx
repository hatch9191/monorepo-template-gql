import type { Meta, StoryObj } from "@storybook/react-vite";

import { Show } from "./Show";

type ExampleProps = {
  when: string | null;
  fallback?: string;
};

function Example({ when, fallback }: ExampleProps) {
  return (
    <Show when={when} fallback={fallback}>
      {(value) => <p>{value}</p>}
    </Show>
  );
}

const meta = {
  title: "Show",
  component: Example,
  tags: ["autodocs"],
  args: {
    when: "Saved",
    fallback: "Nothing to show.",
  },
} satisfies Meta<typeof Example>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Shown: Story = {};

export const Hidden: Story = {
  args: {
    when: null,
    fallback: undefined,
  },
};

export const Fallback: Story = {
  args: {
    when: null,
  },
};
