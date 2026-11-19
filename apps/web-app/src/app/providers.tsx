"use client";

import { type ReactNode, Suspense } from "react";

import { PlatformProvider } from "@/providers/PlatformProvider/PlatformProvider";
import { QueryProvider } from "@/providers/QueryProvider/QueryProvider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <Suspense>
        <PlatformProvider>{children}</PlatformProvider>
      </Suspense>
    </QueryProvider>
  );
}
