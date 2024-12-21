import { generateColorPalette } from "@/lib/generateColorPalette";
import { convertColor, convertPalette } from "@/utils/colorUtils";
import { FormatterFunction } from "@/utils/formatters/formatters";
import { FormatterOptions } from "@/types/outputFormat";

export const formatRadixPalette = (
  palette: ReturnType<typeof generateColorPalette>,
  colorFormat: FormatterOptions["colorFormat"],
) => {
  const { accentPalette, grayPalette, background } = palette;
  const accentColors = convertPalette(accentPalette.scale, colorFormat);
  const grayColors = convertPalette(grayPalette.scale, colorFormat);
  const accentContrast = convertColor(
    accentPalette?.contrast ?? "#000",
    colorFormat,
  );

  const grayContrast = convertColor(
    grayPalette?.contrast ?? "#000",
    colorFormat,
  );

  return ` /* General Colors */   
  --background: ${background};
  --foreground: ${grayColors[11]};
    
  /* Accent Colors */
  --accent-1: ${accentColors[0]};
  --accent-2: ${accentColors[1]};
  --accent-3: ${accentColors[2]};
  --accent-4: ${accentColors[3]};
  --accent-5: ${accentColors[4]};
  --accent-6: ${accentColors[5]};
  --accent-7: ${accentColors[6]};
  --accent-8: ${accentColors[7]};
  --accent-9: ${accentColors[8]};
  --accent-10: ${accentColors[9]};
  --accent-11: ${accentColors[10]};
  --accent-12: ${accentColors[11]};
  --accent-contrast: ${accentContrast};

  /* Gray Colors */
  --gray-1: ${grayColors[0]};
  --gray-2: ${grayColors[1]};
  --gray-3: ${grayColors[2]};
  --gray-4: ${grayColors[3]};
  --gray-5: ${grayColors[4]};
  --gray-6: ${grayColors[5]};
  --gray-7: ${grayColors[6]};
  --gray-8: ${grayColors[7]};
  --gray-9: ${grayColors[8]};
  --gray-10: ${grayColors[9]};
  --gray-11: ${grayColors[10]};
  --gray-12: ${grayColors[11]};
  --gray-contrast: ${grayContrast};`;
};

export const radixFormatter: FormatterFunction = (
  lightPalette,
  darkPalette,
  { colorFormat },
) => {
  return `:root {
${formatRadixPalette(lightPalette, colorFormat)}
}

@media (prefers-color-scheme: dark) {
  :root {
${formatRadixPalette(darkPalette, colorFormat)}
  }
}`;
};
