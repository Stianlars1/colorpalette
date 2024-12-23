import { generateColorPalette } from "@/lib/generateColorPalette";
import { formatPaletteSHADCN } from "@/utils/formatters/helpers/shadcnFormatter";
import { formatRadixPalette } from "@/utils/formatters/helpers/radixFormatter";
import { ThemeType } from "@/types/theme";

export const applyThemeToDocument = (
  backgroundColor: string,
  palette: ReturnType<typeof generateColorPalette>,
  appearance: ThemeType,
) => {
  const root = document.documentElement;
  const cssVariables = formatPaletteSHADCN(
    backgroundColor,
    palette,
    "hslValues",
    appearance,
  );

  const radixVariables = formatRadixPalette(palette, "hslValues");

  // Split the returned string into individual CSS variable declarations
  const variableEntries = cssVariables
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.trim().split(": ");
      if (parts.length !== 2) return null;
      return [parts[0].trim(), parts[1].replace(";", "").trim()];
    })
    .filter((entry): entry is [string, string] => entry !== null);

  const radixVariablesEntries = radixVariables
    .trim()
    .split("\n")
    .map((line) => {
      const parts = line.trim().split(": ");
      if (parts.length !== 2) return null;
      return [parts[0].trim(), parts[1].replace(";", "").trim()];
    })
    .filter(
      (entry): entry is [string, string] =>
        entry !== null && !entry[0].startsWith("/*"),
    );

  localStorage.setItem(
    "apply_theme_to_document",
    JSON.stringify({ radix: radixVariablesEntries, shadcn: variableEntries }),
  );

  // Set each CSS custom property
  radixVariablesEntries.forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });

  // Apply each CSS variable to the document root
  variableEntries.forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });
};
