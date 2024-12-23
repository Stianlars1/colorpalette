import Image from "next/image";
import Link from "next/link";
import styles from "./cardPreview.module.css";

export const CardPreview = () => {
  return (
    <div className={styles.cardPreview}>
      <Image
        src={
          "https://images.unsplash.com/photo-1533933269825-da140ad3132f?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.46&fp-z=1.25&fit=crop"
        }
        alt={"Profile picture"}
        width={60}
        height={60}
        aria-hidden={true}
        priority={false}
        quality={100}
        fetchPriority={"auto"}
        className={styles.image}
      />

      <div className={styles.cardHeader}>
        <h2 className={styles.title}>A simple card can take you anywhere</h2>
        <p className={styles.description}>
          Efficiency doesnt create itself, its implemented!
        </p>
        <p className={styles.scrollAnchor}>Click to scroll up</p>
      </div>

      <Link
        aria-label={"Click to scroll to the top of the pageContainer"}
        className={styles.link}
        href={"#top"}
      />
    </div>
  );
};
