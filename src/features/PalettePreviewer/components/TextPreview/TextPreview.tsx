import styles from "./TextPreview.module.css";
import Link from "next/link";

export const TextPreview = () => {
  return (
    <>
      <div className={styles.textPreview}>
        <h2 className={styles.title}>First blog post!</h2>
        <i className={styles.date}>{new Date().toDateString()}</i>
        <p className={styles.summary}>
          Having the ability to test your colors onto components before usage is
          a great way to select a color palette.
        </p>

        <p className={styles.paragraph}>
          This is a paragraph of text that is being displayed on a blog post. It
          is a great way to show off the color palette that you have created and
          how it looks on different components.
        </p>

        <p className={styles.linkText}>
          This is a{" "}
          <Link
            className={styles.link}
            href={"https://github.com/maxschulmeister/radix-custom-color"}
          >
            Fork
          </Link>{" "}
          from{" "}
          <Link
            className={styles.link}
            href={"https://github.com/maxschulmeister"}
          >
            Max Schulmeister
          </Link>
        </p>
      </div>
    </>
  );
};
