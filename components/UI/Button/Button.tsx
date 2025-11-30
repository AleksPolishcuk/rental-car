import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  fullWidth = false,
  size = "medium",
  loading = false,
  icon,
  iconPosition = "left",
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {icon && iconPosition === "left" && !loading && (
        <span className={styles.iconLeft}>{icon}</span>
      )}

      {loading ? <span aria-live="polite">Loading...</span> : children}

      {icon && iconPosition === "right" && !loading && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );
};
