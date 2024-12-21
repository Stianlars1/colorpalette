import { FormatterFunction } from "@/utils/formatters/formatters";
import { generateColorPalette } from "@/lib/generateColorPalette";
import { convertPalette } from "@/utils/colorUtils";

export const muiFormatter: FormatterFunction = (
  lightPalette,
  darkPalette,
  { colorFormat },
) => {
  const formatPalette = (palette: ReturnType<typeof generateColorPalette>) => {
    const { accentPalette, grayPalette } = palette;
    const accentColors = convertPalette(accentPalette.scale, colorFormat);
    const grayColors = convertPalette(grayPalette.scale, colorFormat);

    return `{
      palette: {
        primary: {
          main: '${accentColors[8]}',
          light: '${accentColors[4]}',
          dark: '${accentColors[10]}',
          contrastText: '${accentPalette.contrast}',
        },
        secondary: {
          main: '${grayColors[8]}',
          light: '${grayColors[4]}',
          dark: '${grayColors[10]}',
          contrastText: '${grayPalette.contrast}',
        },
        grey: {
          50: '${grayColors[0]}',
          100: '${grayColors[1]}',
          200: '${grayColors[2]}',
          300: '${grayColors[3]}',
          400: '${grayColors[4]}',
          500: '${grayColors[5]}',
          600: '${grayColors[6]}',
          700: '${grayColors[7]}',
          800: '${grayColors[8]}',
          900: '${grayColors[9]}',
          A100: '${grayColors[1]}',
          A200: '${grayColors[2]}',
          A400: '${grayColors[4]}',
          A700: '${grayColors[7]}',
        },
        text: {
          primary: '${grayColors[11]}',
          secondary: '${grayColors[10]}',
          disabled: '${grayColors[6]}',
        },
        background: {
          default: '${palette.background}',
          paper: '${grayColors[0]}',
        },
      },
    }`;
  };

  return `const lightTheme = ${formatPalette(lightPalette)}

const darkTheme = ${formatPalette(darkPalette)}`;
};
