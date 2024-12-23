"use client";
import { ReactNode, useEffect } from "react";
import { usePaletteStorage } from "@/hooks/usePaletteStorage";

export default function PaletteLayout({ children }: { children: ReactNode }) {
  const { loadPalette, loadPaletteStorageTheme } = usePaletteStorage();

  useEffect(() => {
    const savedPalette = loadPalette();
    loadPaletteStorageTheme();
    if (savedPalette) {
      // Create a style element
      const styleElement = document.createElement("style");
      styleElement.textContent = savedPalette;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);

  return <>{children}</>;
}
