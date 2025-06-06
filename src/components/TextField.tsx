import { useState } from "react";
import type { ChangeEvent } from "react";

interface TextFieldProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "4px",
          fontSize: "14px",
          color: "rgb(66, 82, 110)",
        }}
      >
        {initialValue}
      </label>

      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid rgb(160, 169, 184)",
          borderRadius: "6px",
          background: "rgb(255, 255, 255)",
          fontSize: "14px",
          color: "rgb(66, 82, 110)",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
};

export default TextField;
