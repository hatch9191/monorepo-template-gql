import { Fragment, type ReactNode } from "react";

type ListRendererProps<T> = {
  items: readonly T[];
  keyOverride: (item: T) => string;
  render: (item: T) => ReactNode;
};

export function ListRenderer<T>({
  items,
  keyOverride,
  render,
}: ListRendererProps<T>) {
  return items.map((item) => {
    return <Fragment key={keyOverride(item)}>{render(item)}</Fragment>;
  });
}
