import { generateColorPalette } from "@/lib/generateColorPalette";
import { ColorFormat, FormatterOptions } from "@/types/outputFormat";
import {
  convertColor,
  convertPalette,
  DESTRUCTIVE_COLORS,
} from "@/utils/colorUtils";
import { ThemeType } from "@/types/theme";

export const shadcnFormatter = (
  lightPalette: ReturnType<typeof generateColorPalette>,
  darkPalette: ReturnType<typeof generateColorPalette>,
  options: FormatterOptions,
): string => {
  const {
    colorFormat,
    backgroundColor = "#ffffff",
    darkmodeBackgroundColor = "#000000",
    appearance,
  } = options;

  return `:root {
${formatPaletteSHADCN(backgroundColor, lightPalette, colorFormat, appearance)}
}

@media (prefers-color-scheme: dark) {
  :root {
${formatPaletteSHADCN(darkmodeBackgroundColor, darkPalette, colorFormat, options.appearance)}
  }
}`;
};

export const formatPaletteSHADCN = (
  bgColor: string,
  palette: ReturnType<typeof generateColorPalette>,
  format: ColorFormat,
  appearance: ThemeType,
) => {
  const { accentPalette, grayPalette } = palette;

  const backgroundColorScale = convertColor(bgColor, format);
  const accentColors = convertPalette(accentPalette.scale, format);
  const grayColors = convertPalette(grayPalette.scale, format);
  const { background: destructive, foreground: destructiveForeground } =
    DESTRUCTIVE_COLORS(appearance, format);
  const accentContrast = convertColor(
    accentPalette?.contrast ?? accentPalette.scale[11],
    format,
  );

  if (appearance === "light") {
    return `  --background: ${backgroundColorScale};
  --foreground: ${grayColors[11]};
  --foreground-subtle: ${grayColors[9]};
  --card: ${backgroundColorScale};
  --card-foreground: ${grayColors[11]};
  --popover: ${grayColors[1]};
  --popover-foreground: ${grayColors[11]};
  --primary: ${accentColors[8]};
  --primary-foreground: ${accentColors[0]};
  --secondary: ${accentColors[1]};
  --secondary-foreground: ${accentColors[11]};
  --muted: ${grayColors[1]};
  --muted-foreground: ${grayColors[10]};
  --accent: ${accentColors[3]};
  --accent-foreground: ${accentColors[11]};
  --destructive: ${destructive};
  --destructive-foreground: ${destructiveForeground};
  --border: ${grayColors[6]};
  --input: ${grayColors[6]};
  --ring: ${accentColors[9]};`;
  } else {
    return `  --background: ${backgroundColorScale};
  --foreground: ${grayColors[11]};
  --foreground-subtle: ${grayColors[9]};
  --card: ${grayColors[0]};
  --card-foreground: ${grayColors[11]};
  --popover: ${grayColors[1]};
  --popover-foreground: ${grayColors[11]};
  --primary: ${accentColors[8]};
  --primary-foreground: ${accentContrast};
  --secondary: ${accentColors[1]};
  --secondary-foreground: ${grayColors[11]};
  --muted: ${grayColors[1]};
  --muted-foreground: ${grayColors[10]};
  --accent: ${accentColors[2]};
  --accent-foreground: ${accentColors[10]};
  --destructive: ${destructive};
  --destructive-foreground: ${destructiveForeground};
  --border: ${grayColors[6]};
  --input: ${grayColors[6]};
  --ring: ${accentColors[9]};`;
  }
};
