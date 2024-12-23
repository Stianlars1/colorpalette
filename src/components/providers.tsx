"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import PaletteLayout from "@/components/PaletteLayout";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <PaletteLayout>{children}</PaletteLayout>
    </ThemeProvider>
  );
}
