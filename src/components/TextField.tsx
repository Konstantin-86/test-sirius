import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";
import style from "../styles/textField.module.css";

interface TextFieldProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState<string>("");

  const debouncedText = useDebounce(value, 1000);

  useEffect(() => {
    if (debouncedText) {
      onChange(debouncedText);
    }
  }, [debouncedText]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={style.container}>
      <label className={style.label}>{initialValue}</label>
      <input
        className={style.input}
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextField;
