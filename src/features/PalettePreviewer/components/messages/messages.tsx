import styles from "./messages.module.css";
import { cn } from "@/lib/utils";

export const Messages = () => {
  return (
    <>
      <div className={cn(styles.wrapper, styles.error)}>
        <div className={styles.content}>
          <span className={styles.icon}>❌</span>

          <p className={styles.description}>Please try again later.</p>
        </div>
      </div>

      <div className={cn(styles.wrapper, styles.info)}>
        <div className={styles.content}>
          <span className={styles.icon}>ℹ️</span>

          <p className={styles.description}>
            Fun fact: Color palettes can evoke specific emotions.
          </p>
        </div>
      </div>

      <div className={cn(styles.wrapper, styles.success)}>
        <div className={styles.content}>
          <span className={styles.icon}>✅</span>

          <p className={styles.description}>Please try again later.</p>
        </div>
      </div>
    </>
  );
};
