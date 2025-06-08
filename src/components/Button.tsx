import React from "react";
import styles from "../styles/button.module.css";

type ButtonProps = {
  state?: "default" | "disabled";
  accent?: "primary" | "secondary";
  text: string;
  icon?: React.ReactNode;
  iconDirection?: "left" | "right";
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  state = "default",
  accent = "primary",
  text,
  icon,
  iconDirection = "left",
  onClick,
  className = "",
}) => {
  const isDisabled = state === "disabled";

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const baseClasses = [styles.button, className].join(" ");

  const stateClasses = [
    isDisabled
      ? styles.disabled
      : accent === "primary"
        ? styles.primary
        : styles.secondary,
  ].join(" ");

  const buttonClassName = `${baseClasses} ${stateClasses}`;

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={buttonClassName}
    >
      <p className={styles.text}>
        {iconDirection === "left" && icon}
        {text}
        {iconDirection === "right" && icon}
      </p>
    </button>
  );
};

export default Button;