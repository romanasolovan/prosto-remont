"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { DayPicker } from "react-day-picker";
import { enUS, pl, ru, uk } from "date-fns/locale";
import styles from "./ContactForm.module.css";

interface FormDatePickerProps {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean,
  ) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ) => void;
}

const localeMap = {
  en: enUS,
  pl,
  uk,
  ru,
};

const parseDateValue = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return undefined;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (Number.isNaN(date.getTime())) return undefined;

  return date;
};

const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function FormDatePicker({
  id,
  name,
  label,
  value,
  error,
  touched,
  required,
  hint,
  placeholder = "YYYY-MM-DD",
  setFieldValue,
  setFieldTouched,
}: FormDatePickerProps) {
  const t = useTranslations("form");
  const locale = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = parseDateValue(value);
  const visibleError = touched ? error : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = visibleError ? `${id}-error` : undefined;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFieldTouched(name, true, true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [name, setFieldTouched]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value, true);
  };

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    setFieldValue(name, formatDateValue(date), true);

    setFieldTouched(name, true, false);

    setTimeout(() => {
      setFieldTouched(name, true, true);
    });

    setIsOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={styles.formGroup} ref={wrapperRef}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>

      <div className={styles.datePicker}>
        <div className={styles.dateInputWrap}>
          <input
            id={id}
            name={name}
            type="text"
            inputMode="numeric"
            value={value}
            placeholder={placeholder}
            className={styles.input}
            aria-invalid={Boolean(visibleError)}
            aria-describedby={
              [hintId, errorId].filter(Boolean).join(" ") || undefined
            }
            onFocus={() => setIsOpen(true)}
            onClick={() => setIsOpen(true)}
            onChange={handleInputChange}
            onBlur={() => setFieldTouched(name, true, true)}
          />

          <button
            type="button"
            className={styles.dateToggle}
            aria-label={t("date.openCalendar")}
            aria-expanded={isOpen}
            aria-controls={`${id}-calendar`}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span aria-hidden="true" />
          </button>
        </div>

        {isOpen && (
          <div
            id={`${id}-calendar`}
            className={styles.calendarPopover}
            role="dialog"
            aria-label={t("date.calendarLabel")}
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              locale={localeMap[locale as keyof typeof localeMap] || enUS}
              weekStartsOn={1}
              classNames={{
                root: styles.calendarRoot,
                month: styles.calendarMonth,
                month_caption: styles.calendarCaption,
                caption_label: styles.calendarCaptionLabel,
                nav: styles.calendarNav,
                button_previous: styles.calendarNavButton,
                button_next: styles.calendarNavButton,
                month_grid: styles.calendarGrid,
                weekdays: styles.calendarWeekdays,
                weekday: styles.calendarWeekday,
                week: styles.calendarWeek,
                day: styles.calendarDay,
                day_button: styles.calendarDayButton,
                today: styles.calendarToday,
                selected: styles.calendarSelected,
                outside: styles.calendarOutside,
                disabled: styles.calendarDisabled,
              }}
              disabled={{ before: new Date() }}
            />
          </div>
        )}
      </div>

      {hint && (
        <p id={hintId} className={styles.fieldHint}>
          {hint}
        </p>
      )}

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
