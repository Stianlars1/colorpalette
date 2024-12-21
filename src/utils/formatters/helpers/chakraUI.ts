import { FormatterFunction } from "@/utils/formatters/formatters";
import { generateColorPalette } from "@/lib/generateColorPalette";
import { convertPalette } from "@/utils/colorUtils";

export const chakraFormatter: FormatterFunction = (
  lightPalette,
  darkPalette,
  { colorFormat },
) => {
  const formatPalette = (palette: ReturnType<typeof generateColorPalette>) => {
    const { accentPalette, grayPalette } = palette;
    const accentColors = convertPalette(accentPalette.scale, colorFormat);
    const grayColors = convertPalette(grayPalette.scale, colorFormat);

    return `{
  colors: {
    brand: {
      50: '${accentColors[0]}',
      100: '${accentColors[1]}',
      200: '${accentColors[2]}',
      300: '${accentColors[3]}',
      400: '${accentColors[4]}',
      500: '${accentColors[5]}',
      600: '${accentColors[6]}',
      700: '${accentColors[7]}',
      800: '${accentColors[8]}',
      900: '${accentColors[9]}'
    },
    gray: {
      50: '${grayColors[0]}',
      100: '${grayColors[1]}',
      200: '${grayColors[2]}',
      300: '${grayColors[3]}',
      400: '${grayColors[4]}',
      500: '${grayColors[5]}',
      600: '${grayColors[6]}',
      700: '${grayColors[7]}',
      800: '${grayColors[8]}',
      900: '${grayColors[9]}'
    }
  }
}`;
  };

  return `import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme(${formatPalette(lightPalette)});

export default theme;`;
};
