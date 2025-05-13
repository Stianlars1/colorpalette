import * as RadixColors from "@radix-ui/colors";
import Color from "colorjs.io";

export const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
//export const defaultLightnessAdjustmentCurve = [0, 2, 0, 2]; // deprecated
export const radixLightSteps = [
  98.5, 96.4, 94, 90.2, 85, 78.2, 69.8, 60, 48, 35, 27, 15,
];

// Chroma taper – keeps hue perceptually stable near white
export const radixChromaSteps = [
  0.008, 0.012, 0.018, 0.024, 0.03, 0.036, 0.04, 0.044, 0.048, 0.052, 0.056,
  0.06,
];
// Default curve no longer needed – keep it for legacy but set to identity
export const defaultLightnessAdjustmentCurve = [0, 0, 0, 0];

export const grayScales = ["gray", "mauve", "slate", "sage", "olive", "sand"];
export const allScales = [
  ...grayScales,
  "tomato",
  "red",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "brown",
  "orange",
  "sky",
  "mint",
  "lime",
  "yellow",
  "amber",
];

const createColorObjects = (scales: string[], isDark: boolean) =>
  Object.fromEntries(
    scales.map((scale) => [
      scale,
      Object.values(
        RadixColors[
          `${scale}${isDark ? "Dark" : ""}P3` as keyof typeof RadixColors
        ],
      ).map((color) => new Color(color).to("oklch")),
    ]),
  );

export const radixColors = {
  light: createColorObjects(allScales, false),
  dark: createColorObjects(allScales, true),
};

export const grayRadixColors = {
  light: createColorObjects(grayScales, false),
  dark: createColorObjects(grayScales, true),
};
