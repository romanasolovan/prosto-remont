
"use client";

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {SelectOption, FormSelectProps} from "./types";
import { useFormikContext } from "formik";

import fields from "./Fields/FormFields.module.css";
import styles from "./Fields/FormSelect.module.css";


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
  
  const { submitCount } = useFormikContext();

  const listId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedIndex = options.findIndex(
    (option) => option.value === value,
  );
  const selectedOption = options[selectedIndex];

  const showError = Boolean(
    error && (submitCount > 0 || (touched && Boolean(value))),
  );
  const visibleError = showError ? error : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : 0,
  );

  const closeSelect = useCallback(
    (shouldTouch = true, restoreFocus = false) => {
      setIsOpen(false);

      if (shouldTouch) {
        onBlur(name, true, true);
      }

      if (restoreFocus) {
        triggerRef.current?.focus();
      }
    },
    [name, onBlur],
  );

  const openSelect = useCallback(
    (initialIndex?: number) => {
      if (!options.length) return;

      setActiveIndex(
        initialIndex ??
          (selectedIndex >= 0 ? selectedIndex : 0),
      );
      setIsOpen(true);
    },
    [options.length, selectedIndex],
  );

  const chooseOption = useCallback(
    (option?: SelectOption, restoreFocus = false) => {
      if (!option) return;

      onChange(name, option.value, true);
      onBlur(name, true, false);
      setIsOpen(false);

      void validateField(name);

      if (restoreFocus) {
        triggerRef.current?.focus();
      }
    },
    [name, onChange, onBlur, validateField],
  );

  useEffect(() => {
    if (!isOpen) return;

    const activeOption = optionRefs.current[activeIndex];

    activeOption?.focus();
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        closeSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, [isOpen, closeSelect]);

  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!options.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      openSelect();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openSelect(
        selectedIndex >= 0
          ? selectedIndex
          : options.length - 1,
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      openSelect(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      openSelect(options.length - 1);
    }
  };

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index + 1) % options.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index - 1 + options.length) % options.length,
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseOption(options[index], true);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeSelect(false, true);
    }

    if (event.key === "Tab") {
      closeSelect();
    }
  };

  return (
    <div className={fields.formGroup} ref={wrapperRef}>
      <label id={`${id}-label`} className={fields.label}>
        {label}
        {required && (
          <span className={fields.required} aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className={styles.customSelect}>
        <button
          ref={triggerRef}
          id={id}
          type="button"
          className={`${styles.selectButton} ${
            !value ? styles.isPlaceholder : ""
          } ${showError ? styles.hasError : ""}`}
          aria-labelledby={`${id}-label ${id}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-describedby={
            visibleError ? `${id}-error` : undefined
          }
          onClick={() => {
            if (isOpen) {
              closeSelect(false);
            } else {
              openSelect();
            }
          }}
          onKeyDown={handleTriggerKeyDown}
        >
          <span className={styles.selectValue}>
            {selectedOption?.label || placeholder}
          </span>

          <span
            className={styles.selectIcon}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div
            id={listId}
            className={styles.selectMenu}
            role="listbox"
            aria-labelledby={`${id}-label`}
          >
            {options.map((option, index) => (
              <button
                key={option.value}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="option"
                tabIndex={index === activeIndex ? 0 : -1}
                aria-selected={option.value === value}
                className={`${styles.selectOption} ${
                  option.value === value
                    ? styles.isSelected
                    : ""
                } ${
                  index === activeIndex
                    ? styles.isActive
                    : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseOption(option)}
                onKeyDown={(event) =>
                  handleOptionKeyDown(event, index)
                }
              >
                <span>{option.label}</span>

                {option.value === value && (
                  <span
                    className={styles.optionMark}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={fields.errorSlot} aria-live="polite">
        <p
          id={`${id}-error`}
          className={`${fields.error} ${
            showError ? fields.visible : ""
          }`}
        >
          {visibleError || "\u00A0"}
        </p>
      </div>
    </div>
  );
}
