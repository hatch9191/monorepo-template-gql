export type RouterAdapter = {
  pathname: string;
  searchParams: URLSearchParams;
  push(path: string): void;
  replace(path: string): void;
};
