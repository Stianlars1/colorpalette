"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PalettePreviewer } from "@/features/PalettePreviewer/PalettePreviewer";
import { useLocalTheme } from "@/hooks/useLocalTheme";
import { Header } from "@/components/layout/header";
import { ThemeType } from "@/types/theme";
import NewColorPaletteGenerator from "@/components/NewColorPaletteGenerator";
import { ColorFields } from "@/components/ui/colorFields/colorFields";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CopyableOutput } from "@/components/copyableOutput/CopyableOutput";
import { GradientPageBackground } from "@/components/GradientPageBackground/GradientPageBackground";
import { Footer } from "@/components/layout/footer/footer";

export default function Home() {
  const { accent, gradientColor, gray, background, darkBackground } =
    useLocalTheme();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accentColor, setAccentColor] = useState(accent);
  const [grayColor, setGrayColor] = useState(gray);
  const [backgroundColor, setBackgroundColor] = useState(background);
  const [darkmodeBackgroundColor, setDarkmodeBackgroundColor] =
    useState(darkBackground);

  const isLightMode = theme === "light";

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <>
      <main className="container min-h-screen min-w-full p-0 m-0">
        <div className={" flex  flex-col gap-8 pageContentWrapper"}>
          <Header
            backgroundColor={backgroundColor}
            darkmodeBackgroundColor={darkmodeBackgroundColor}
            theme={theme as ThemeType}
            toggleTheme={toggleTheme}
          />

          <ColorFields
            accent={{
              label: "Accent",
              value: accentColor,
              onChange: setAccentColor,
            }}
            backgroundColor={{
              label: "Light-mode Background",
              value: backgroundColor,
              onChange: setBackgroundColor,
            }}
            darkmodeBackground={{
              label: "Dark-mode Background",
              value: darkmodeBackgroundColor,
              onChange: setDarkmodeBackgroundColor,
            }}
            gray={{
              label: "Gray",
              value: grayColor,
              onChange: setGrayColor,
            }}
          />
          <NewColorPaletteGenerator
            appearance={theme as ThemeType}
            accentColor={accentColor}
            grayColor={grayColor}
            backgroundColor={backgroundColor}
            darkmodeBackgroundColor={darkmodeBackgroundColor}
          />

          <Link
            href={"#preview-your-palette"}
            className={"text-center flex flex-col items-center"}
          >
            Scroll down to preview your colors
            <ChevronDownIcon />
          </Link>
        </div>

        <PalettePreviewer
          grayColor={grayColor}
          accentColor={accentColor}
          backgroundColor={backgroundColor}
          appearance={theme as ThemeType}
        />

        <CopyableOutput
          appearance={theme as ThemeType}
          accentColor={accentColor}
          grayColor={grayColor}
          backgroundColor={backgroundColor}
          darkmodeBackgroundColor={darkmodeBackgroundColor}
        />

        <Footer />
      </main>
      <GradientPageBackground
        theme={(theme as ThemeType) ?? ("light" as ThemeType)}
      />
    </>
  );
}
