// SyntaxHighlighter.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { CodePreview } from "@stianlarsen/react-code-preview";
import styles from "./syntaxHighlighter.module.css";
import "./syntaxHighlighterPlain.css";
import { cn } from "@/lib/utils";

interface SyntaxHighlighterProps {
  code: string;
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
}) => {
  const [mounted, setMounted] = useState(false);
  const [displayedCode, setDisplayedCode] = useState(code);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const previousCodeRef = useRef<string>(code);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (code !== previousCodeRef.current) {
      // Clear any existing timeouts
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      setIsTransitioning(true);

      // Start fade out
      transitionTimeoutRef.current = setTimeout(() => {
        // Update the displayed code immediately when we're at maximum fade
        setDisplayedCode(code);
        previousCodeRef.current = code;

        // Start fade in after a brief delay to ensure the content has updated
        requestAnimationFrame(() => {
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
          }, 75);
        });
      }, 75);

      return () => {
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
      };
    }
  }, [code]);

  if (!mounted) return null;

  return (
    <div id="copy-your-colors" className={cn(styles.container, "highlighter")}>
      <div
        className={cn(
          styles.highlighterWrapper,
          isTransitioning && styles.transitioning,
        )}
      >
        <CodePreview
          className={cn(styles.highlighter)}
          code={displayedCode}
          key={displayedCode} // Force re-render when code changes
        />
      </div>
    </div>
  );
};
