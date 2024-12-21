"use client";
export const useLocalTheme = () => {
  let accent = "#3c77f6";
  let gray = "#d3d4d5";
  let background = "#faf9f9";
  let darkBackground = "#050505";

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
