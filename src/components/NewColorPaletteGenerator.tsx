"use client";

import { generateColorPalette } from "@/lib/generateColorPalette";
import { useEffect, useState } from "react";
import ColorGrid from "./ColorGrid";
import { ThemeType } from "@/types/theme";
import { updateThemeColor } from "@/lib/updateThemeColor";

const NewColorPaletteGenerator = ({
  appearance,
  accentColor,
  grayColor,
  backgroundColor,
  darkmodeBackgroundColor,
}: {
  appearance: ThemeType;
  accentColor: string;
  grayColor: string;
  backgroundColor: string;
  darkmodeBackgroundColor: string;
}) => {
  const [generatedPalette, setGeneratedPalette] = useState<ReturnType<
    typeof generateColorPalette
  > | null>(null);

  const [generatedLightPalette, setGeneratedLightPalette] = useState<ReturnType<
    typeof generateColorPalette
  > | null>(null);

  const [generatedDarkPalette, setGeneratedDarkPalette] = useState<ReturnType<
    typeof generateColorPalette
  > | null>(null);

  const isLightMode = appearance === "light";

  useEffect(() => {
    const defaultPalette = generateColorPalette({
      appearance,
      background: isLightMode ? backgroundColor : darkmodeBackgroundColor,
      gray: grayColor,
      accent: accentColor,
    });

    const lightPalette = generateColorPalette({
      appearance: "light",
      background: backgroundColor,
      gray: grayColor,
      accent: accentColor,
    });
    const darkPalette = generateColorPalette({
      appearance: "dark",
      background: darkmodeBackgroundColor,
      gray: grayColor,
      accent: accentColor,
    });

    localStorage.setItem(
      `radix_custom_color_gradient`,
      defaultPalette.accentPalette.scale[3].toLowerCase(),
    );
    updateThemeColor(
      appearance,
      lightPalette.accentPalette.scale[3],
      darkPalette.accentPalette.scale[3],
    );

    setGeneratedPalette(defaultPalette);
    setGeneratedLightPalette(lightPalette);
    setGeneratedDarkPalette(darkPalette);
  }, [appearance, backgroundColor, grayColor, accentColor]);

  return (
    <section>
      <div
        className="space-y-8 "
        style={{
          width: "100%",
          maxWidth: "var(--max-width)",
          margin: "2rem auto 0",
        }}
      >
        {generatedPalette && generatedLightPalette && generatedDarkPalette && (
          <>
            <ColorGrid
              title={`Accents`}
              colors={generatedPalette.accentPalette}
              grayPalette={
                appearance === "light"
                  ? generatedLightPalette.grayPalette
                  : generatedDarkPalette.grayPalette
              }
            />
            <ColorGrid
              title={`Grays`}
              colors={generatedPalette.grayPalette}
              grayPalette={
                appearance === "light"
                  ? generatedLightPalette.grayPalette
                  : generatedDarkPalette.grayPalette
              }
            />
          </>
        )}
      </div>
    </section>
  );
};

export default NewColorPaletteGenerator;
