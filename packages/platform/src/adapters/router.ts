export type RouterAdapter = {
  push(path: string): void;
  replace(path: string): void;
  refresh(): void;
};
