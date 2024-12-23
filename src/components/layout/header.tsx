import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ThemeType } from "@/types/theme";
import { isSafariIOS } from "@/lib/isSafari";
import { updateThemeColor } from "@/lib/updateThemeColor";

export const Header = ({
  theme,
  backgroundColor,
  darkmodeBackgroundColor,
  toggleTheme,
}: {
  theme: ThemeType;
  backgroundColor: string;
  darkmodeBackgroundColor: string;
  toggleTheme: (theme: ThemeType) => void;
}) => {
  const handleGoToCopy = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const dialogEl = document.getElementById(
      "export_colors_dialog",
    ) as HTMLDialogElement;

    const dialogbackdropFallback = document.getElementById(
      "export_colors_dialog_backdrop",
    );

    if (dialogEl) {
      console.log("open dialog");
      updateThemeColor(theme, backgroundColor, darkmodeBackgroundColor);
      dialogEl.showModal();

      if (isSafariIOS() && dialogbackdropFallback) {
        dialogbackdropFallback.style.display = "block";
      }
    }
  };
  return (
    <div id={"top"} className="flex flex-col items-center mb-4 mt-[4rem]">
      <h1
        className="mb-6 text-4xl font-bold text-center"
        style={{
          color: "hsl(var(--foreground))",
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        Generate a <span style={{ color: "hsl(var(--primary))" }}>custom</span>{" "}
        palette
      </h1>
      <p className={"max-w-3xl text-center mb-5 text-pretty"}>
        You&apos;ll need to provide a few colors to generate a custom palette.
        Then afterwards you can copy the CSS variables from{" "}
        <Link
          className={"link"}
          onClick={handleGoToCopy}
          href={"#stylesheet-output"}
        >
          here
        </Link>{" "}
        to use in your project.
      </p>
      <div className="flex overflow-hidden border rounded-md border-gray-6 dark:border-grayDark-6">
        <button
          onClick={() => toggleTheme("light")}
          className={`px-3 py-2 flex items-center transition-colors ${
            theme === "light"
              ? "bg-gray-4 text-gray-12"
              : "dark:bg-grayDark-1 dark:text-grayDark-11 dark:hover:bg-grayDark-3 "
          }`}
        >
          <SunIcon className="w-4 h-4 mr-2" />
          Light
        </button>
        <button
          onClick={() => toggleTheme("dark")}
          className={`px-3 py-2 flex items-center transition-colors ${
            theme === "dark"
              ? "dark:bg-grayDark-4 dark:text-grayDark-12"
              : "bg-gray-1 text-gray-11 hover:bg-gray-3 "
          }`}
        >
          <MoonIcon className="w-4 h-4 mr-2" />
          Dark
        </button>
      </div>
      <p className={"text-sm max-w-[300px] text-center mt-[0.5rem]"}>
        Toggle the theme to preview the colors in both{" "}
        <strong>
          <span
            style={{
              color: "hsl(var(--foreground))",
              borderRadius: "2px",
              margin: "0 4px",
              backgroundColor: "hsl(var(--muted) / 0.5)",
              border: "1px solid hsl(var(--border) / 0.5)",
              padding: "0 4px",
            }}
          >
            light
          </span>
        </strong>{" "}
        and{" "}
        <strong>
          <span
            style={{
              color: "hsl(var(--background))",
              borderRadius: "2px",
              margin: "0 4px",
              backgroundColor: "hsl(var(--foreground) )",
              border: "1px solid hsl(var(--border))",
              padding: "0 4px",
            }}
          >
            dark
          </span>
        </strong>{" "}
        mode.
      </p>
    </div>
  );
};
