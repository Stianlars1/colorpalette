"use client";

import React, { useEffect } from "react";
import { trackWebsiteVisit } from "@/lib/logExportEvent";
import styles from "./insightsData.module.css";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { useWindowSize } from "@/hooks/useWindowSize";

export interface InsightsData {
  totalExports: number;
  totalVisits: number;
  requestsExport: number;
  stylesheetPresets: Record<string, number>;
  colorFormats: Record<string, number>;
  lastUpdated: {
    seconds: number;
    nanoseconds: number;
  };
}

export const WelcomeBanner = ({
  insights,
  onMobile,
}: {
  insights: string | null;
  onMobile: boolean;
}) => {
  const insightsData = insights ? (JSON.parse(insights) as InsightsData) : null;

  useEffect(() => {
    // Track website visit when component mounts (once per session)
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      trackWebsiteVisit().catch((err) =>
        console.error("Failed to track visit:", err),
      );
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  // Find the most popular stylesheet preset
  const getMostPopularPreset = () => {
    if (!insightsData?.stylesheetPresets) return null;

    return Object.entries(insightsData.stylesheetPresets)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))[0];
  };

  // Find the most popular color format
  const getMostPopularFormat = () => {
    if (!insightsData?.colorFormats) return null;

    return Object.entries(insightsData.colorFormats)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }))[0];
  };

  // Format the preset name for display
  const formatPresetName = (name: string) => {
    switch (name) {
      case "cssVariables":
        return "CSS Variables";
      case "cssInJs":
        return "CSS-in-JS";
      case "SCSS":
        return "SCSS";
      case "materialUI":
        return "Material UI";
      case "chakraUI":
        return "Chakra UI";

      case "tailwind":
        return "Tailwind";

      case "shadcn":
        return "Shadcn";
      case "radix":
        return "Radix";

      default:
        name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  // Format the color format name for display
  const formatColorName = (name: string) => {
    switch (name) {
      case "hex":
        return "HEX";
      case "rgb":
        return "RGB";
      case "hsl":
        return "HSL";
      case "hslValues":
        return "HSL Values";
      case "OKLAB":
        return "OkLab";
      case "OKLCH":
        return "OkLCh";
      default:
        name.toUpperCase();
    }
  };

  const mostPopularPreset = getMostPopularPreset();
  const mostPopularFormat = getMostPopularFormat();

  const totalUsers = insightsData?.totalVisits || 0;
  const { width } = useWindowSize();
  const isMobile = width <= 500;

  return (
    <div
      className={cx(
        styles.welcomeBanner,
        !onMobile && isMobile && styles.hidden,
        onMobile && !isMobile && styles.hidden,
        onMobile && isMobile && styles.onMobile,
      )}
    >
      <div className={styles.bannerContent}>
        <div className={styles.statsContainer}>
          <Image
            className={styles.image}
            src={"/logo.svg"}
            width={50}
            height={50}
            alt={"Logo"}
          />
          <div className={styles.statItem}>
            <div className={styles.statValue}>{totalUsers}</div>
            <div className={styles.statLabel}>color explorers</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statValue}>{insightsData?.totalExports}</div>
            <div className={styles.statLabel}>palettes created</div>
          </div>

          {mostPopularPreset && (
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                {formatPresetName(mostPopularPreset.name)}
              </div>
              <div className={styles.statLabel}>
                most popular framework
                <span className={styles.miniStat}>
                  chosen by{" "}
                  <span className={styles.preferredNumber}>
                    {mostPopularPreset.count}
                  </span>{" "}
                  users
                </span>
              </div>
            </div>
          )}

          {mostPopularFormat && (
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                {formatColorName(mostPopularFormat.name)}
              </div>
              <div className={styles.statLabel}>
                favorite color format
                <span className={styles.miniStat}>
                  picked{" "}
                  <span className={styles.preferredNumber}>
                    {mostPopularFormat.count}
                  </span>{" "}
                  times
                </span>
              </div>
            </div>
          )}
        </div>

        {/*        {insightsData && insightsData.requestsExport > 0 && (
          <div className={styles.requestsBadge}>
            <span className={styles.requestsCount}>
              {insightsData.requestsExport}
            </span>{" "}
            color enthusiasts have requested new export formats.{" "}
            <Link
              href={
                "https://github.com/Stianlars1/colorpalette/issues/new?labels=feature-request,export-format&template=export-format-request.md&title=%5BExport%20Format%5D%3A%20"
              }
              className={styles.requestsLink}
            >
              Want to suggest one?
            </Link>
          </div>
        )}*/}
      </div>
    </div>
  );
};

export default WelcomeBanner;
