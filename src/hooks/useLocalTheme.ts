"use client";
export const useLocalTheme = () => {
  let accent = "#00ffcc";
  let gray = "#8b8d98";
  let background = "#ffffff";
  let darkBackground = "#111111";

  if (typeof window !== "undefined") {
    accent =
      window.localStorage?.getItem("radix_custom_color_accent") ?? accent;
    gray = window.localStorage?.getItem("radix_custom_color_gray") ?? gray;
    background =
      window.localStorage?.getItem(
        "radix_custom_color_light-mode background",
      ) ?? background;
    darkBackground =
      window.localStorage?.getItem("radix_custom_color_dark-mode background") ??
      darkBackground;
  }

  return { accent, gray, background, darkBackground };
};
