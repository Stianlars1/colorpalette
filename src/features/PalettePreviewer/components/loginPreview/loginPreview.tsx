"use client";
import { useEffect, useState } from "react";
import styles from "./loginPreview.module.css";
import { Spinner } from "@/features/PalettePreviewer/components/Spinner/Spinner";
import { cx } from "class-variance-authority";

export const LoginPreview = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(!isLoading), 2000);
    }
  }, [isLoading]);
  const handleClick = () => {
    setIsLoading(!isLoading);
  };

  return (
    <>
      <div className={styles.loginPreview}>
        <h2 className={styles.heading}>Login</h2>
        <form autoComplete={"off"} className={styles.wrapper}>
          <label htmlFor={"input1_login"} className={styles.label}>
            Email
          </label>
          <input
            id={"input1_login"}
            className={styles.input}
            value={inputValue}
            placeholder={"Enter your email"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        <form autoComplete={"off"} className={styles.wrapper}>
          <label htmlFor={"input2_login"} className={styles.label}>
            Password
          </label>
          <input
            id={"input2_login"}
            className={styles.input}
            value={inputValue}
            placeholder={"Enter your password"}
            type={"password"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        <button className={styles.submit} onClick={handleClick}>
          <span className={cx(styles.button, isLoading && styles.hideOnLoad)}>
            Log in
          </span>
          <span className={cx(styles.loader, isLoading && styles.isLoading)}>
            <Spinner />
          </span>
        </button>
      </div>
    </>
  );
};
