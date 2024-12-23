"use client";
import { CodePreview } from "@stianlarsen/react-code-preview";
import "./syntax.css";

export const Syntax = ({ code }: { code: string }) => {
  return (
    <CodePreview
      lightTheme={"github-light-default"}
      darkTheme={"github-dark-default"}
      code={code}
    />
  );
};
