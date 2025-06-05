import React from "react";
import styles from "../styles/button.module.css";

type ButtonProps = {
  state?: "default" | "disabled";
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  state = "default",
  text,
  icon,
  onClick,
  className = "",
}) => {
  const isDisabled = state === "disabled";

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleClick}
      className={
        isDisabled ? styles.disabled : `${styles.default} ${className}`
      }
    >
      <span>{text}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;
