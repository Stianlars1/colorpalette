import { PageContainer } from "@/components/layout/pageContainer/pageContainer";
import { Syntax } from "@/components/syntax/Syntax";
import { themesExample1, themesExample2 } from "@/app/themes/lib";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export default async function ThemesPage() {
  return (
    <>
      <div
        className={
          "w-full max-w-[1024px] ml-auto mr-auto flex items-center gap-1 mt-2"
        }
        style={{ color: "hsl(var(--accent-11))" }}
      >
        <ChevronLeftIcon style={{ color: "hsl(var(--foreground))" }} />
        <Link className={"hover:underline"} href={"/"}>
          ColorPalette
        </Link>
      </div>
      <PageContainer>
        <h1 className={"mt-2"}>Using Custom Color Themes in Your Project</h1>
        <div className={"flex items-center gap-2 mb-4 mt-2"}>
          <Image
            src={"/logo.svg"}
            alt={"logo"}
            aria-hidden={true}
            width={25}
            height={25}
            loading={"eager"}
            quality={100}
            priority={true}
            fetchPriority={"high"}
          />
          <i style={{ color: "hsl(var(--muted-foreground))" }}>
            {new Date("2024-12-23").toDateString()}
          </i>
        </div>
        <p>
          Here&apos;s how to use the color variables from ColorPalette with a
          custom theme toggle instead of system preferences:
        </p>
        <h4>Step 1: Copy the Variables</h4>
        <p>
          Take the CSS code and modify it slightly by separating the themes into
          two classes:
        </p>

        <Syntax code={themesExample1} />

        <h4>Step 2: Toggle Between Themes</h4>
        <p>
          There&apos;s many ways to toggle the light-dark variables, some prefer
          a &quot;.dark&quot; class added to the <strong>:root</strong>{" "}
          {"<html>"} element.
        </p>
        <p>
          Instead of using prefers-color-scheme, you&apos;ll toggle themes by
          adding/removing the data-theme=&quot;dark&quot; attribute on your HTML
          element:
        </p>
        <Syntax code={themesExample2} />
        <p>
          That&apos;s it! The colors will automatically update when you toggle
          the theme attribute.
        </p>
      </PageContainer>
    </>
  );
}
