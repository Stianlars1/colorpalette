import styles from "./GradientPageBackground.module.css";
import { ThemeType } from "@/types/theme";

export const GradientPageBackground = ({ theme }: { theme: ThemeType }) => {
  const gradient =
    " linear-gradient(to bottom, hsl(var(--accent-4)), transparent)";
  return (
    <>
      <div
        className={styles.backgroundGradient}
        style={{
          background: gradient,
        }}
      />
    </>
  );
};
