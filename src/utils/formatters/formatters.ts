import { generateColorPalette } from "@/lib/generateColorPalette";
import { FormatterOptions, ThemeFormat } from "@/types/outputFormat";
import { shadcnFormatter } from "@/utils/formatters/helpers/shadcnFormatter";
import { cssVariablesFormatter } from "@/utils/formatters/helpers/cssVariables";
import { tailwindFormatter } from "@/utils/formatters/helpers/tailwindFormatter";
import { radixFormatter } from "@/utils/formatters/helpers/radixFormatter";
import { cssInJsFormatter } from "@/utils/formatters/helpers/cssInJs";
import { scssFormatter } from "@/utils/formatters/helpers/scss";
import { muiFormatter } from "@/utils/formatters/helpers/materialUI";
import { chakraFormatter } from "@/utils/formatters/helpers/chakraUI";

export type FormatterFunction = (
  lightPalette: ReturnType<typeof generateColorPalette>,
  darkPalette: ReturnType<typeof generateColorPalette>,
  options: FormatterOptions,
) => string;

export const formatters: Record<ThemeFormat, FormatterFunction> = {
  radix: radixFormatter,
  shadcn: shadcnFormatter,
  tailwind: tailwindFormatter,
  cssVariables: cssVariablesFormatter,
  cssInJs: cssInJsFormatter,
  SCSS: scssFormatter,
  materialUI: muiFormatter,
  chakraUI: chakraFormatter,
};
