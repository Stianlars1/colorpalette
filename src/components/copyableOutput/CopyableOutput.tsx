"use client";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import styles from "./CopyableOutput.module.css";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  ColorFormat,
  FormatterOptions,
  ThemeFormat,
} from "@/types/outputFormat";
import { generateColorPalette } from "@/lib/generateColorPalette";
import { formatters } from "@/utils/formatters/formatters";
import { SyntaxHighlighter } from "@/components/syntaxHighlighter/SyntaxHighlighter";
import { applyThemeToDocument } from "@/utils/applyTheme";
import { ThemeType } from "@/types/theme";
import { debounce } from "@/utils/debounce";
import { cn } from "@/lib/utils";
import {
  colorFormats,
  stylesheetPresets,
} from "@/components/copyableOutput/lib";
import RequestExportOption from "@/components/requestOption/requestOption";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import { updateThemeColor } from "@/lib/updateThemeColor";
import { isSafariIOS } from "@/lib/isSafari";
import { usePaletteStorage } from "@/hooks/usePaletteStorage";

interface CopyableOutputProps {
  appearance: ThemeType;
  accentColor: string;
  grayColor: string;
  backgroundColor: string;
  darkmodeBackgroundColor: string;
}

// eslint-disable-next-line react/display-name
export const CopyableOutput = memo(
  ({
    appearance,
    accentColor,
    grayColor,
    backgroundColor,
    darkmodeBackgroundColor,
  }: CopyableOutputProps) => {
    const [selectedFormat, setSelectedFormat] =
      useState<ThemeFormat>("cssVariables");
    const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
    const [colorPalettes, setColorPalettes] = useState<{
      light: ReturnType<typeof generateColorPalette> | null;
      dark: ReturnType<typeof generateColorPalette> | null;
    }>({ light: null, dark: null });
    const [isExpanded, setIsExpanded] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const [debouncedCode, setDebouncedCode] = useState("");
    const { savePalette } = usePaletteStorage();
    const isLight = appearance === "light";
    // Debounced update for syntax highlighting
    const updateSyntaxHighlighter = useMemo(
      () =>
        debounce((newKey: string, newCode: string) => {
          setDebouncedCode(newCode);
        }, 300),
      [],
    );

    // Generate the syntax key
    const syntaxKey = useMemo(
      () =>
        `${accentColor}-${grayColor}-${backgroundColor}-${selectedFormat}-${colorFormat}`,
      [accentColor, grayColor, backgroundColor, selectedFormat, colorFormat],
    );

    // Generate palettes with debounce
    const generatePalettes = useMemo(
      () =>
        debounce(
          (
            currentAppearance: ThemeType,
            bgColor: string,
            darkBgColor: string,
            gray: string,
            accent: string,
          ) => {
            const lightPalette = generateColorPalette({
              appearance: "light",
              background: bgColor,
              gray: gray,
              accent: accent,
            });

            const darkPalette = generateColorPalette({
              appearance: "dark",
              background: darkBgColor,
              gray: gray,
              accent: accent,
            });

            const isLightMode = appearance === "light";

            setColorPalettes({ light: lightPalette, dark: darkPalette });
            applyThemeToDocument(
              isLightMode ? bgColor : darkBgColor,
              isLightMode ? lightPalette : darkPalette,
              appearance,
            );
          },
          50,
        ),
      [appearance],
    );

    // Effect for palette generation
    useEffect(() => {
      generatePalettes(
        appearance,
        backgroundColor,
        darkmodeBackgroundColor,
        grayColor,
        accentColor,
      );

      return () => {
        generatePalettes.cancel();
      };
    }, [
      appearance,
      backgroundColor,
      darkmodeBackgroundColor,
      grayColor,
      accentColor,
      generatePalettes,
    ]);

    // Effect for updating syntax highlighter
    useEffect(() => {
      if (!colorPalettes.light || !colorPalettes.dark) return;

      const options: FormatterOptions = {
        colorFormat,
        backgroundColor,
        darkmodeBackgroundColor,
        appearance,
      };

      const formattedCode = formatters[selectedFormat](
        colorPalettes.light,
        colorPalettes.dark,
        options,
      );

      updateSyntaxHighlighter(syntaxKey, formattedCode);

      return () => {
        updateSyntaxHighlighter.cancel();
      };
    }, [
      colorPalettes,
      selectedFormat,
      colorFormat,
      backgroundColor,
      darkmodeBackgroundColor,
      syntaxKey,
      updateSyntaxHighlighter,
    ]);

    const handleShowModal = () => {
      if (!dialogRef.current || !backdropRef.current) return;

      if (dialogRef.current.open) {
        dialogRef.current.close();
        backdropRef.current.style.display = "none";
        if (colorPalettes.light && colorPalettes.dark) {
          updateThemeColor(
            isLight
              ? colorPalettes.light?.accentPalette.scale[3]
              : colorPalettes.dark?.accentPalette.scale[3],
          );
        }
      } else {
        updateThemeColor(isLight ? backgroundColor : darkmodeBackgroundColor);

        console.log("open");
        dialogRef.current.showModal();
        if (isSafariIOS()) {
          backdropRef.current.style.display = "block";
        }
      }
    };
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const handleOutsideClick = (e: MouseEvent) => {
        if (e.target === dialog) {
          dialog.close();
          if (backdropRef.current) {
            backdropRef.current.style.display = "none";
          }
        }
      };

      dialog.addEventListener("click", handleOutsideClick);

      return () => {
        dialog.removeEventListener("click", handleOutsideClick);
      };
    }, [dialogRef.current, backdropRef.current]);

    const handleExpand = () => {
      setIsExpanded(!isExpanded);
      const highlighterEl = document.getElementById("stylesheet-output");
      if (!highlighterEl) return;
      setTimeout(() => {
        highlighterEl.scrollIntoView({ behavior: "smooth" });
      }, 200);
    };

    return (
      <>
        <dialog
          id={"export_colors_dialog"}
          className={cn("export_colors_dialog", styles.dialog)}
          ref={dialogRef}
          open={false}
        >
          <div className={styles.wrapper}>
            <button onClick={handleShowModal} className={styles.closeButton}>
              <Cross1Icon />
            </button>
            <div className={styles.container}>
              <div className={styles.formatSelection}>
                <div>
                  <label className={styles.label}>StyleSheet Preset:</label>
                  <div className={styles.radioGroup}>
                    {stylesheetPresets.map((format) => (
                      <label
                        key={format}
                        className={cn(
                          styles.radioLabel,
                          selectedFormat === format && styles.activeRadioLabel,
                        )}
                      >
                        <input
                          type="radio"
                          name="format"
                          value={format}
                          checked={selectedFormat === format}
                          onChange={(e) =>
                            setSelectedFormat(e.target.value as ThemeFormat)
                          }
                          style={{ display: "none" }}
                          className={cn(styles.radioInput)}
                        />
                        <span tabIndex={0} className={styles.radioLabelTitle}>
                          {format === "cssVariables" ? "CSS Variables" : format}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Color format selection - now available for all formats */}
                <div className={styles.subFormatSelection}>
                  <label className={styles.label}>Color Format:</label>
                  <div className={styles.radioGroup}>
                    {colorFormats.map((format) => (
                      <label
                        key={format}
                        className={cn(
                          styles.radioLabel,
                          colorFormat === format && styles.activeRadioLabel,
                        )}
                      >
                        <input
                          type="radio"
                          name="colorFormat"
                          value={format}
                          style={{ display: "none" }}
                          checked={colorFormat === format}
                          onChange={(e) =>
                            setColorFormat(e.target.value as ColorFormat)
                          }
                          className={styles.radioInput}
                        />
                        <span tabIndex={0}>
                          {format === "hslValues"
                            ? "HSL Values"
                            : format.toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                  <RequestExportOption />
                </div>
              </div>

              {colorPalettes.light && colorPalettes.dark && (
                <div className={styles.output}>
                  <div className={styles.codeBlock}>
                    <h2
                      id={"stylesheet-output"}
                      className={styles.codeBlockTitle}
                    >
                      StyleSheet Output
                    </h2>

                    <div
                      className={cx(
                        styles.syntaxHighlighter,
                        isExpanded && styles.syntaxExpanded,
                      )}
                    >
                      <SyntaxHighlighter code={debouncedCode} />
                    </div>
                    <Button
                      className={styles.ghostButton}
                      variant={"link"}
                      onClick={handleExpand}
                    >
                      {isExpanded ? "Close" : "Expand"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </dialog>

        <div
          id={"export_colors_dialog_backdrop"}
          ref={backdropRef}
          className={styles.backdropFallback}
          style={{ display: "none" }}
        />

        <button className={styles.exportButton} onClick={handleShowModal}>
          Export colors
        </button>
      </>
    );
  },
);
