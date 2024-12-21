import { ReactElement, ReactNode } from "react";
import styles from "./contentWrapper.module.css";

export const ContentWrapper = ({
  children,
  className,
  style,
  noExtras = true,
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
  className?: string;
  style?: React.CSSProperties;
  noExtras?: boolean;
}) => {
  return (
    <div
      className={` ${className} ${
        noExtras ? styles.contentPlain : styles.content
      }`}
      style={style}
    >
      {children}
    </div>
  );
};
