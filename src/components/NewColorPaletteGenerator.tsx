"use client";

import { generateColorPalette } from "@/lib/generateColorPalette";
import { useEffect, useState } from "react";
import ColorGrid from "./ColorGrid";
import { ThemeType } from "@/types/theme";

const NewColorPaletteGenerator = ({
  appearance,
  accentColor,
  grayColor,
  backgroundColor,
}: {
  appearance: ThemeType;
  accentColor: string;
  grayColor: string;
  backgroundColor: string;
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

  useEffect(() => {
    const defaultPalette = generateColorPalette({
      appearance,
      background: backgroundColor,
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
      background: backgroundColor,
      gray: grayColor,
      accent: accentColor,
    });

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
