"use client";

import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import styles from "./ContactForm.module.css";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: SelectOption[];
  error?: string;
  touched?: boolean;
  required?: boolean;
  onChange: (field: string, value: string, shouldValidate?: boolean) => void;
  onBlur: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void;
  validateField: (
    field: string,
  ) => void | Promise<string | undefined> | Promise<void>;
}

export default function FormSelect({
  id,
  name,
  label,
  placeholder,
  value,
  options,
  error,
  touched,
  required,
  onChange,
  onBlur,
  validateField,
}: FormSelectProps) {
  const t = useTranslations("form");
  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options.find((option) => option.value === value);
  const visibleError = touched ? error : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : 0,
  );

  const closeSelect = useCallback(
    (shouldTouch = true) => {
      setIsOpen(false);

      if (shouldTouch) {
        onBlur(name, true, true);
      }
    },
    [name, onBlur],
  );

  const openSelect = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setIsOpen(true);
  };

  const chooseOption = async (option: SelectOption) => {
    onChange(name, option.value, true);
    onBlur(name, true, false);
    setIsOpen(false);

    await validateField(name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSelect]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!isOpen) {
        openSelect();
        return;
      }

      setActiveIndex((current) =>
        current + 1 >= options.length ? 0 : current + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!isOpen) {
        openSelect();
        return;
      }

      setActiveIndex((current) =>
        current - 1 < 0 ? options.length - 1 : current - 1,
      );
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (!isOpen) {
        openSelect();
        return;
      }

      void chooseOption(options[activeIndex]);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeSelect(false);
    }

    if (event.key === "Tab") {
      closeSelect();
    }
  };

  return (
    <div className={styles.formGroup} ref={wrapperRef}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.customSelect}>
        <button
          id={id}
          type="button"
          className={`${styles.selectButton} ${
            !value ? styles.isPlaceholder : ""
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-describedby={visibleError ? `${id}-error` : undefined}
          onClick={() => {
            if (isOpen) closeSelect(false);
            else openSelect();
          }}
          onKeyDown={handleKeyDown}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <span className={styles.selectIcon} aria-hidden="true" />
        </button>

        {isOpen && (
          <div
            id={listId}
            className={styles.selectMenu}
            role="listbox"
            aria-label={t("select.chooseOption")}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                className={`${styles.selectOption} ${
                  option.value === value ? styles.isSelected : ""
                } ${index === activeIndex ? styles.isActive : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => void chooseOption(option)}
              >
                <span>{option.label}</span>

                {option.value === value && (
                  <span className={styles.optionMark} aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.errorSlot} id={`${id}-error`} aria-live="polite">
        <div
          className={`${styles.error} ${visibleError ? styles.visible : ""}`}
        >
          {visibleError || "\u00A0"}
        </div>
      </div>
    </div>
  );
}
