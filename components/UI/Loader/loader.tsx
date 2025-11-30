import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  withOverlay?: boolean;
  size?: "small" | "medium" | "large";
  type?: "spinner" | "simple";
}

export const Loader: React.FC<LoaderProps> = ({
  withOverlay = false,
  size = "medium",
  type = "spinner",
}) => {
  if (type === "simple") {
    return (
      <div className={styles.simpleLoader}>
        <div className={styles.simpleSpinner}></div>
      </div>
    );
  }

  if (withOverlay) {
    return (
      <div className={styles.loaderWithOverlay}>
        <div className={`${styles.loader} ${styles[size]}`}></div>
      </div>
    );
  }

  return <div className={`${styles.loader} ${styles[size]}`}></div>;
};
export const SimpleLoader = () => <Loader type="simple" />;
