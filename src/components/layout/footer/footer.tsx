import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";

export const Footer = () => {
  const year = new Date().getFullYear();
  const gradientColor =
    localStorage.getItem("radix_custom_color_gradient") ?? "#ddeaff";
  const [gradient, setGradient] = useState(gradientColor);

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === "radix_custom_color_gradient") {
        const hasNewValue = e.newValue !== gradient;
        if (hasNewValue && e.newValue) {
          setGradient(e.newValue);
        }
      }
    });
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <div className={styles.brand}>
            <Image
              src="/logo.svg"
              priority={true}
              alt="ColorPalette logo"
              width={55}
              height={55}
              className={styles.logo}
            />
            <div className={styles.brandInfo}>
              <h3 className={styles.brandName}>ColorPalette</h3>
              <p className={styles.brandTagline}>
                <span className={styles.gradientText2}>Create</span>{" "}
                <span className={styles.gradientText1}>beautiful</span> color
                palettes with <strong>instant</strong>{" "}
                <span className={styles.gradientText3}>code</span> export
              </p>
            </div>
          </div>
          <p className={styles.copyright}>{year} ColorPalette.</p>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4>Product</h4>
            <ul>
              <li>
                <Link prefetch={true} href="/themes" scroll={true}>
                  Themes
                </Link>
              </li>
              <li>
                <Link prefetch={true} href="/export" scroll={true}>
                  Export Options
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4>Resources</h4>
            <ul>
              <li>
                <Link href="/guides">Guides</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.attribution}>
        <p>Built with passion by</p>
        <div className={styles.creators}>
          <Link
            href="https://www.maxschulmeister.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Max Schulmeister
          </Link>
          <span>•</span>
          <Link
            href="https://www.radix-ui.com/colors/custom"
            target="_blank"
            rel="noopener noreferrer"
          >
            Radix UI
          </Link>
          <span>•</span>
          <Link
            href="https://stianlarsen.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stian Larsen
          </Link>
        </div>
      </div>
    </footer>
  );
};
