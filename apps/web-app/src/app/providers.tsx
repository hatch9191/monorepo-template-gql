"use client";

import type { ReactNode } from "react";

import { PlatformProvider } from "@/providers/PlatformProvider/PlatformProvider";
import { QueryProvider } from "@/providers/QueryProvider/QueryProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <PlatformProvider>{children}</PlatformProvider>
    </QueryProvider>
  );
}
