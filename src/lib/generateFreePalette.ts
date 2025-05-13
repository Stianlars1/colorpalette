import Color from "colorjs.io";
import Bezier from "bezier-easing";

const L_LIGHT = [99.2, 98.4, 96.4, 94, 90.2, 85, 78.2, 69.8, 60, 48, 35, 27];
const L_DARK = [9, 12, 16, 20, 24, 30, 39, 49, 60, 72, 84, 92];

const easeIn = Bezier(0, 0, 0, 1);
const easeOut = Bezier(1, 0, 1, 0);

export type Scale12 = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export default function generateFreePalette(
  baseHex: string,
  mode: "light" | "dark" = "light",
): Color[] {
  const base = new Color(baseHex).to("oklch");
  const Ls = mode === "light" ? L_LIGHT : L_DARK;
  const baseIndex = 8;
  const deltaL = base.l * 100 - Ls[baseIndex];
  const scale = Ls.map((L, i) => {
    const p = i / 11;
    const L2 = Math.min(100, Math.max(0, L + deltaL));

    const Cmax = Math.min(0.16, base.c); // litt mer spill

    const C = Cmax * Math.pow(1 - p, 1.4);

    return new Color("oklch", [L2 / 100, C, base.h]);
  });

  return scale;
}
