// Knobs.tsx
"use client";
import styles from "./knobs.module.css";
import { useState } from "react";
import {
  BellIcon,
  LayersIcon,
  LayoutIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";

export const Knobs = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  const handleToggle = () => {
    setChecked1(!checked1);
  };
  const handleToggle2 = () => {
    setChecked2(!checked2);
  };

  return (
    <div className={styles.knobsWrapper}>
      <div className={styles.knob}>
        <button
          className={`${styles.switch} ${checked1 ? styles.checked : ""}`}
          type="button"
          role="switch"
          aria-checked={checked1}
          onClick={handleToggle}
        >
          <span className={styles.slider}>
            <span className={styles.knobIndicator} />
          </span>
          <span className={styles.srOnly}>Toggle switch</span>
        </button>

        <button
          className={`${styles.switch} ${checked2 ? styles.checked : ""}`}
          type="button"
          role="switch"
          aria-checked={checked2}
          onClick={handleToggle2}
        >
          <span className={styles.slider}>
            <span className={styles.knobIndicator} />
          </span>
          <span className={styles.srOnly}>Toggle switch</span>
        </button>
      </div>

      <div className={styles.squares}>
        <BellIcon className={styles.squareButton} />
        <MixerHorizontalIcon className={styles.squareButton} />
        <LayoutIcon className={styles.squareButton} />
        <LayersIcon className={styles.squareButton} />
      </div>
    </div>
  );
};
