import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "./input";

const meta = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    "aria-label": "Title",
    placeholder: "Title",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "Market",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Market",
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    "aria-invalid": true,
    defaultValue: "Market",
  },
};
