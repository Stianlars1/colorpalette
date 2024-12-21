"use client";
import { useEffect, useState } from "react";
import styles from "./signupPreview.module.css";
import { Spinner } from "@/features/PalettePreviewer/components/Spinner/Spinner";
import { cn } from "@/lib/utils";

export const SignupPreview = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
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
      <div className={styles.signupPreview}>
        <h2 className={styles.heading}>Signup</h2>
        <form autoComplete={"off"} className={styles.wrapper}>
          <label htmlFor={"input1"} className={styles.label}>
            Email
          </label>
          <input
            id={"input1"}
            className={styles.input}
            value={inputValue}
            placeholder={"Enter your email"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        <form autoComplete={"off"} className={styles.wrapper}>
          <label htmlFor={"input2"} className={styles.label}>
            Password
          </label>
          <input
            id={"input2"}
            className={cn(styles.input, isError && styles.inputError)}
            value={inputValue}
            placeholder={"Enter your password"}
            type={"password"}
            onBlur={() => setIsError(!isError)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <form autoComplete={"off"} className={styles.wrapper}>
          <label htmlFor={"input3"} className={styles.label}>
            Repeat password
          </label>
          <input
            id={"input3"}
            className={styles.input}
            value={inputValue}
            placeholder={"Confirm password"}
            type={"password"}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>

        <button className={styles.submit} onClick={handleClick}>
          <span className={cn(styles.button, isLoading && styles.hideOnLoad)}>
            Submit
          </span>
          <span className={cn(styles.loader, isLoading && styles.isLoading)}>
            <Spinner />
          </span>
        </button>
      </div>
    </>
  );
};
