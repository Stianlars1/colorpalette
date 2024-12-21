import { useEffect, useRef, useState } from "react";
import { generateColorPalette } from "@/lib/generateColorPalette";
import styles from "./PalettePreviewer.module.css";
import { ThemeType } from "@/types/theme";
import { ContentWrapper } from "@/features/PalettePreviewer/components/contentWrapper/contentWrapper";
import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { LoginPreview } from "@/features/PalettePreviewer/components/loginPreview/loginPreview";
import { CardPreview } from "@/features/PalettePreviewer/components/cardPreview/cardPreview";
import { Todos } from "@/features/PalettePreviewer/components/todos/todos";
import { Knobs } from "@/features/PalettePreviewer/components/knobs/knobs";
import { SignupPreview } from "@/features/PalettePreviewer/components/signupPreview/signupPreview";
import { TextPreview } from "@/features/PalettePreviewer/components/TextPreview/TextPreview";
import { Messages } from "@/features/PalettePreviewer/components/messages/messages";
import { LightBeam } from "@stianlarsen/react-light-beam";
import { cn } from "@/lib/utils";

export const PalettePreviewer = ({
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
  const previewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultPalette = generateColorPalette({
      appearance,
      background: backgroundColor,
      gray: grayColor,
      accent: accentColor,
    });

    setGeneratedPalette(defaultPalette);
  }, [appearance, backgroundColor, grayColor, accentColor]);

  return (
    <>
      <div
        className={cn("min-h-screen min-w-full ", styles.palettePreviewer)}
        ref={previewerRef}
      >
        {previewerRef && (
          <LightBeam
            maskLightByProgress={true}
            className={styles.lightBeam}
            colorLightmode={accentColor}
            colorDarkmode={accentColor}
            fullWidth={0.75}
            scrollElement={typeof window !== "undefined" ? window : undefined}
          />
        )}
        <h1
          id={"preview-your-palette"}
          className={"text-center  mt-28 text-[24px] sm:text-[32px] font-bold"}
        >
          Preview your palette
        </h1>
        {generatedPalette && (
          <>
            <div className={styles.textPreviews}>
              <SignupPreview />
              <LoginPreview />
            </div>

            <div className={styles.cardWrapper}>
              <div className={styles.cardAndKnobs}>
                <ContentWrapper>
                  <TextPreview />

                  <CardPreview />
                  <Knobs />
                </ContentWrapper>
              </div>
              <div>
                <Todos />
                <Messages />
              </div>
            </div>
          </>
        )}
        <Link
          href={"#copy-your-colors"}
          className={"text-center flex flex-col items-center mt-12"}
        >
          Scroll down to copy your colors
          <ChevronDownIcon />
        </Link>
      </div>
      <div className={`   ${styles.section2}`}>
        <h1 className={styles.title2}>
          <span className={styles.primarySpan}>Palettes</span> and{" "}
          <span className={styles.accentSpan}>Colors</span> easily{" "}
          <span style={{ color: "hsl(var(--foreground-subtle))" }}>
            accessible
          </span>
        </h1>
      </div>
    </>
  );
};
