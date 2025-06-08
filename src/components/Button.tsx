import React from "react";
import styles from "../styles/button.module.css";
import ArrowIcon from "./ArrowIcon";

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

  const iconColor = accent === "primary" ? "#FFFFFF" : "#000000";

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={buttonClassName}
    >
      <p className={styles.text}>
        {iconDirection === "left" && (icon || <ArrowIcon color={iconColor} direction="left" size={16} />)}
        {text}
        {iconDirection === "right" && (icon || <ArrowIcon color={iconColor} direction="right" size={16} />)}
      </p>
    </button>
  );
};

export default Button;