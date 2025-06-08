import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";
import style from "../styles/textField.module.css";

interface TextFieldProps {
  initialValue: string;
  value: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  initialValue,
  value: propValue,
  onChange
}) => {
  const [localValue, setLocalValue] = useState<string>(propValue);
  const debouncedText = useDebounce(localValue, 500);

  useEffect(() => {
    setLocalValue(propValue);
  }, [propValue]);

  useEffect(() => {
    if (debouncedText !== propValue) {
      onChange(debouncedText);
    }
  }, [debouncedText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
  };

  return (
    <div className={style.container}>
      <label className={style.label}>{initialValue}</label>
      <input
        className={style.input}
        type="text"
        value={localValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;