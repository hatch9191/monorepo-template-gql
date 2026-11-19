import { Input } from "@repo/ui/components/atoms/input";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./field";

const meta = {
  title: "Field",
  component: Field,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input id="title" placeholder="Title" />
      </Field>
      <Field>
        <FieldLabel htmlFor="body">Body</FieldLabel>
        <Input id="body" placeholder="Body" />
        <FieldDescription>Shown under the title in the list.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="title">Title</FieldLabel>
      <Input id="title" aria-invalid="true" defaultValue="Market" />
      <FieldError>Title is required.</FieldError>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="title">Title</FieldLabel>
      <Input id="title" placeholder="Title" />
    </Field>
  ),
};
