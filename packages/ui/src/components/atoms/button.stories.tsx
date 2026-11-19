import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

import { Button } from "./button";

type ButtonVariant = NonNullable<ComponentProps<typeof Button>["variant"]>;
type ButtonSize = NonNullable<ComponentProps<typeof Button>["size"]>;

const variants = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const satisfies readonly ButtonVariant[];

const sizes = [
  "xs",
  "sm",
  "default",
  "lg",
] as const satisfies readonly ButtonSize[];

const iconSizes = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
] as const satisfies readonly ButtonSize[];

const iconLabels: Record<(typeof iconSizes)[number], string> = {
  "icon-xs": "Add, extra small",
  "icon-sm": "Add, small",
  icon: "Add",
  "icon-lg": "Add, large",
};

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Create",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Variants: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => {
        return (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        );
      })}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => {
        return (
          <Button key={size} size={size}>
            {size}
          </Button>
        );
      })}
    </div>
  ),
};

export const IconSizes: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {iconSizes.map((size) => {
        return (
          <Button key={size} size={size} aria-label={iconLabels[size]}>
            <PlusIcon />
          </Button>
        );
      })}
    </div>
  ),
};
