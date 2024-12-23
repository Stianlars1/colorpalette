import { generateColorPalette } from "@/lib/generateColorPalette";
import { convertColor, convertPalette } from "@/utils/colorUtils";
import { FormatterFunction } from "@/utils/formatters/formatters";

export const cssVariablesFormatter: FormatterFunction = (
  lightPalette,
  darkPalette,
  { colorFormat },
) => {
  const formatPalette = (palette: ReturnType<typeof generateColorPalette>) => {
    const { accentPalette, grayPalette, background } = palette;
    const accentColors = convertPalette(accentPalette.scale, colorFormat);
    const grayColors = convertPalette(grayPalette.scale, colorFormat);
    const accentContrast = convertColor(
      accentPalette?.contrast ?? accentPalette.scale[11],
      colorFormat,
    );
    const grayContrast = convertColor(
      grayPalette?.contrast ?? grayPalette.scale[11],
      colorFormat,
    );
    const backgroundColor = convertColor(background, colorFormat);

    return ` /* General Colors */ 
   --background: ${backgroundColor};
   --foreground: ${grayColors[11]};  
    
    /* Accent Colors */ 
  --accent-50: ${accentColors[0]};
  --accent-100: ${accentColors[1]};
  --accent-200: ${accentColors[2]};
  --accent-300: ${accentColors[3]};
  --accent-400: ${accentColors[4]};
  --accent-500: ${accentColors[5]};
  --accent-600: ${accentColors[6]};
  --accent-700: ${accentColors[7]};
  --accent-800: ${accentColors[8]};
  --accent-900: ${accentColors[9]};
  --accent-950: ${accentColors[10]};
  --accent-1000: ${accentColors[11]};
  --accent-contrast: ${accentContrast};

  /* Gray Colors */ 
  --gray-50: ${grayColors[0]};
  --gray-100: ${grayColors[1]};
  --gray-200: ${grayColors[2]};
  --gray-300: ${grayColors[3]};
  --gray-400: ${grayColors[4]};
  --gray-500: ${grayColors[5]};
  --gray-600: ${grayColors[6]};
  --gray-700: ${grayColors[7]};
  --gray-800: ${grayColors[8]};
  --gray-900: ${grayColors[9]};
  --gray-950: ${grayColors[10]};
  --gray-1000: ${grayColors[11]};
  --gray-contrast: ${grayContrast};`;
  };

  return `:root {
${formatPalette(lightPalette)}
}

@media (prefers-color-scheme: dark) {
  :root {
${formatPalette(darkPalette)}
  }
}`;
};
