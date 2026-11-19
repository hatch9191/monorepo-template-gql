import type { ReactNode } from "react";

import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Notes",
  description: "A small notes example.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
