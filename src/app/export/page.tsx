import { PageContainer } from "@/components/layout/pageContainer/pageContainer";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Syntax } from "@/components/syntax/Syntax";
import {
  chakraUI,
  css,
  cssInJs,
  materialUI,
  radix,
  scss,
  shadcn,
  tailwind,
} from "@/app/export/lib";

export default async function ExportPage() {
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
        <h1 className={"mt-2"}>Using the Export Options</h1>
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

        <p className="mb-8">
          Learn how to export your color palette in different formats to
          seamlessly integrate with your preferred tools and frameworks.
        </p>

        <section className="mb-12">
          <h2>How to Use the Exporter</h2>
          <ol className="space-y-4 mt-4">
            <li>
              <strong>Select Your Framework:</strong> Choose from the available
              options at the top (CSS Variables, shadcn, Tailwind, etc.)
            </li>
            <li>
              <strong>Choose Color Format:</strong> Pick between HEX, RGB, HSL,
              HSL Values, OKLAB, or OKLCH formats
            </li>
            <li>
              <strong>Copy the Code:</strong> Use the copy button in the
              top-right corner of the code block
            </li>
          </ol>
        </section>

        <h2>Available Export Formats</h2>

        <section className="mb-8">
          <h3>CSS Variables</h3>
          <p className="mb-4">
            Perfect for modern web projects, CSS variables (custom properties)
            provide dynamic color values that can be updated via JavaScript and
            cascade through your stylesheets.
          </p>
          <Syntax code={css} />
        </section>

        <section className="mb-8">
          <h3>shadcn/ui</h3>
          <p className="mb-4">
            Optimized for shadcn/ui components, using HSL values for maximum
            compatibility and ease of use with the component library.
          </p>
          <Syntax code={shadcn} />
        </section>

        <section className="mb-8">
          <h3>Tailwind CSS</h3>
          <p className="mb-4">
            Direct integration with your Tailwind configuration. Copy this into
            your tailwind.config.js file to use your colors as utility classes.
          </p>
          <Syntax code={tailwind} />
        </section>

        <section className="mb-8">
          <h3>Radix Colors</h3>
          <p className="mb-4">
            HSL values formatted for Radix UI&apos;s color system, perfect for
            creating consistent design systems.
          </p>
          <Syntax code={radix} />
        </section>

        <section className="mb-8">
          <h3>CSS-in-JS</h3>
          <p className="mb-4">
            Export your colors as a JavaScript object, ideal for
            styled-components, emotion, or other CSS-in-JS solutions.
          </p>
          <Syntax code={cssInJs} />
        </section>

        <section className="mb-8">
          <h3>SCSS Variables</h3>
          <p className="mb-4">
            SCSS variables for Sass workflows, maintaining the same color
            structure in a Sass-friendly format.
          </p>
          <Syntax code={scss} />
        </section>

        <section className="mb-8">
          <h3>Material UI</h3>
          <p className="mb-4">
            Theme configuration for Material UI, including primary and secondary
            color palettes with light and dark variants.
          </p>
          <Syntax code={materialUI} />
        </section>

        <section className="mb-8">
          <h3>Chakra UI</h3>
          <p className="mb-4">
            Ready-to-use theme extension for Chakra UI, complete with all the
            necessary color scales.
          </p>
          <Syntax code={chakraUI} />
        </section>

        <section className="mt-12 p-4 border border-[hsl(var(--border))] rounded-md">
          <h4>Need a Different Format?</h4>
          <p className="mb-4">
            Don&apos;t see your preferred format? We&apos;re always looking to
            support more frameworks and tools.
          </p>
          <Link
            href="https://github.com/Stianlars1/colorpalette/issues/new?labels=feature-request,export-format&template=export-format-request.md&title=%5BExport%20Format%5D%3A%20"
            className="text-[hsl(var(--accent-11))] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Request a new export format →
          </Link>
        </section>
      </PageContainer>
    </>
  );
}
