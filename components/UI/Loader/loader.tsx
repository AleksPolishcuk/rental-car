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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
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
