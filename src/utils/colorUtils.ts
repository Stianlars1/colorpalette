import { ColorFormat } from "@/types/outputFormat";
import Color from "colorjs.io";
import { extractColorValues } from "@/lib/converters";
import { ThemeType } from "@/types/theme";

export const DESTRUCTIVE_COLORS = (theme: ThemeType, format: ColorFormat) => {
  switch (theme) {
    case "light":
      return {
        background: convertColor("#ed7e7f", format),

        foreground: convertColor("#000000", format),
      };
    case "dark":
      return {
        background: convertColor("#7f1d1d", format),
        foreground: convertColor("#ffffff", format),
      };
  }
};
export const roundToOneDecimal = (value: number) => Number(value.toFixed(1));

export const convertColor = (color: string, format: ColorFormat) => {
  switch (format) {
    case "hex":
      return color;
    case "rgb": {
      const colorObj = new Color(color).to("srgb");
      colorObj.coords = colorObj.coords.map((value) =>
        roundToOneDecimal(value),
      ) as [number, number, number];
      return colorObj.toString({ format: "rgb" });
    }
    case "hsl": {
      const colorObj = new Color(color).to("hsl");
      if (colorObj.coords[1] === 0) colorObj.coords[0] = 0;
      colorObj.coords = colorObj.coords.map((value) =>
        roundToOneDecimal(value),
      ) as [number, number, number];
      return colorObj.toString({ format: "hsl" });
    }
    case "hslValues": {
      const colorObj = new Color(color).to("hsl");
      if (colorObj.coords[1] === 0) colorObj.coords[0] = 0;
      colorObj.coords = colorObj.coords.map((value) =>
        roundToOneDecimal(value),
      ) as [number, number, number];
      return extractColorValues(colorObj.toString({ format: "hsl" }));
    }

    case "OKLAB": {
      const colorObj = new Color(color).to("oklab");
      colorObj.coords = colorObj.coords.map((value) =>
        roundToOneDecimal(value),
      ) as [number, number, number];
      return colorObj.toString({ format: "oklab" });
    }
    case "OKLCH": {
      const colorObj = new Color(color).to("oklch");
      colorObj.coords = colorObj.coords.map((value) =>
        roundToOneDecimal(value),
      ) as [number, number, number];
      return colorObj.toString({ format: "oklch" });
    }
  }
};

export const convertPalette = (colors: string[], format: ColorFormat) => {
  return colors.map((color) => convertColor(color, format));
};
