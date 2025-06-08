import styles from "../styles/radioButton.module.css";

interface RadioButtonProps {
  options: string[];
  name: string;
  selectedValue: string | null;
  onChange: (selectedValue: string | null) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  name,
  selectedValue,
  onChange,
}) => {
  const handleChange = (value: string) => {
    const newValue = selectedValue === value ? null : value;
    onChange(newValue);
  };

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <label className={styles.label} key={option}>
          <div
            className={
              selectedValue === option ? styles.selected : styles.unselected
            }
          />
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={() => handleChange(option)}
            className={styles.input}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;