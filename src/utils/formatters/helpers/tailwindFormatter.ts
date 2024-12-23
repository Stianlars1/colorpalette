import { convertColor, convertPalette } from "@/utils/colorUtils";
import { FormatterFunction } from "@/utils/formatters/formatters";

export const tailwindFormatter: FormatterFunction = (
  lightPalette,
  darkPalette,
  { colorFormat },
) => {
  const { accentPalette: lightAccent, grayPalette: lightGray } = lightPalette;
  const { accentPalette: darkAccent, grayPalette: darkGray } = darkPalette;

  const lightAccentColors = convertPalette(lightAccent.scale, colorFormat);
  const lightGrayColors = convertPalette(lightGray.scale, colorFormat);
  const darkAccentColors = convertPalette(darkAccent.scale, colorFormat);
  const darkGrayColors = convertPalette(darkGray.scale, colorFormat);
  const accentContrastLight = convertColor(
    lightAccent?.contrast ?? lightAccent.scale[11],
    colorFormat,
  );
  const grayContrastLight = convertColor(
    lightGray?.contrast ?? lightGray.scale[11],
    colorFormat,
  );
  const accentContrastDark = convertColor(
    darkAccent?.contrast ?? darkAccent.scale[11],
    colorFormat,
  );
  const grayContrastDark = convertColor(
    darkGray?.contrast ?? darkGray.scale[11],
    colorFormat,
  );

  return `const colors = {
  light: {
    accent: {
      50: '${lightAccentColors[0]}',
      100: '${lightAccentColors[1]}',
      200: '${lightAccentColors[2]}',
      300: '${lightAccentColors[3]}',
      400: '${lightAccentColors[4]}',
      500: '${lightAccentColors[5]}',
      600: '${lightAccentColors[6]}',
      700: '${lightAccentColors[7]}',
      800: '${lightAccentColors[8]}',
      900: '${lightAccentColors[9]}',
      950: '${lightAccentColors[10]}',
      1000: '${lightAccentColors[11]}',
      contrast: '${accentContrastLight}'
    },
    gray: {
      50: '${lightGrayColors[0]}',
      100: '${lightGrayColors[1]}',
      200: '${lightGrayColors[2]}',
      300: '${lightGrayColors[3]}',
      400: '${lightGrayColors[4]}',
      500: '${lightGrayColors[5]}',
      600: '${lightGrayColors[6]}',
      700: '${lightGrayColors[7]}',
      800: '${lightGrayColors[8]}',
      900: '${lightGrayColors[9]}',
      950: '${lightGrayColors[10]}',
      1000: '${lightGrayColors[11]}',
      contrast: '${grayContrastLight}'
    }
  },
  dark: {
    accent: {
      50: '${darkAccentColors[0]}',
      100: '${darkAccentColors[1]}',
      200: '${darkAccentColors[2]}',
      300: '${darkAccentColors[3]}',
      400: '${darkAccentColors[4]}',
      500: '${darkAccentColors[5]}',
      600: '${darkAccentColors[6]}',
      700: '${darkAccentColors[7]}',
      800: '${darkAccentColors[8]}',
      900: '${darkAccentColors[9]}',
      950: '${darkAccentColors[10]}',
      1000: '${darkAccentColors[11]}',
      contrast: '${accentContrastDark}'
    },
    gray: {
      50: '${darkGrayColors[0]}',
      100: '${darkGrayColors[1]}',
      200: '${darkGrayColors[2]}',
      300: '${darkGrayColors[3]}',
      400: '${darkGrayColors[4]}',
      500: '${darkGrayColors[5]}',
      600: '${darkGrayColors[6]}',
      700: '${darkGrayColors[7]}',
      800: '${darkGrayColors[8]}',
      900: '${darkGrayColors[9]}',
      950: '${darkGrayColors[10]}',
      1000: '${darkGrayColors[11]}',
      contrast: '${grayContrastDark}'
    }
  }
};

module.exports = {
  theme: {
    extend: {
      colors: {
        accent: colors.light.accent,
        gray: colors.light.gray,
        dark: {
          accent: colors.dark.accent,
          gray: colors.dark.gray
        }
      }
    }
  },
  darkMode: 'media'
}`;
};
