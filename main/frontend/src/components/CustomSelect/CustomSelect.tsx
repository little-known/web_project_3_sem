import { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.css";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CustomSelect = ({
  value,
  options,
  onChange,
  placeholder,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || {
    value: "",
    label: placeholder || "Выберите...",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <button
        type="button"
        className={`${styles.selectButton} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectValue}>{selectedOption.label}</span>
        <svg
          width="6"
          height="4"
          viewBox="0 0 6 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
        >
          <rect
            x="5.85719"
            y="0.585938"
            width="4.14154"
            height="0.828308"
            transform="rotate(135 5.85719 0.585938)"
            fill="white"
          />
          <rect
            x="0.585709"
            width="4.14154"
            height="0.828309"
            transform="rotate(45 0.585709 0)"
            fill="white"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${
                value === option.value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

