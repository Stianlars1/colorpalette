import { ThemeType } from "@/types/theme";

export type ThemeFormat =
  | "radix"
  | "shadcn"
  | "tailwind"
  | "cssVariables"
  | "cssInJs"
  | "SCSS"
  | "materialUI"
  | "chakraUI";
// types/outputFormat.ts
export type ColorFormat =
  | "hex"
  | "rgb"
  | "hsl"
  | "hslValues"
  | "OKLAB"
  | "OKLCH";

export interface FormatterOptions {
  colorFormat: ColorFormat;
  backgroundColor?: string; // Only needed for shadcn
  darkmodeBackgroundColor?: string; // Only needed for shadcn
  appearance: ThemeType; // Only needed for shadcn
}
