import styles from "./pageContainer.module.css";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.pageContainer}>{children}</div>;
};
