"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type {FormDatePickerProps} from "./types";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { DayPicker } from "react-day-picker";
import { useFormikContext } from "formik";
import { enUS, pl, ru, uk } from "date-fns/locale";
import fields from "./Fields/FormFields.module.css";
import styles from "./Fields/FormDatePicker.module.css";

const localeMap = {
  en: enUS,
  pl,
  uk,
  ru,
};

const VIEWPORT_PADDING = 12;
const POPOVER_GAP = 8;
const FALLBACK_CALENDAR_HEIGHT = 390;

const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const parseDateValue = (value: string): Date | undefined => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) return undefined;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  date.setHours(0, 0, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }

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
  validateField,
}: FormDatePickerProps) {
  const t = useTranslations("form");
  const locale = useLocale();

  const { submitCount } = useFormikContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const today = getToday();
  const selectedDate = parseDateValue(value);
  const showError = Boolean(
  error && (submitCount > 0 || (touched && value.trim().length > 0)),
);
const visibleError = showError ? error : undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = visibleError ? `${id}-error` : undefined;

  const [isOpen, setIsOpen] = useState(false);

  const [month, setMonth] = useState<Date>(selectedDate ?? today);
  const [popoverStyle, setPopoverStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const updatePopoverPosition = useCallback(() => {
    if (!inputWrapRef.current) return;

    const rect = inputWrapRef.current.getBoundingClientRect();
    const popoverHeight =
      popoverRef.current?.offsetHeight || FALLBACK_CALENDAR_HEIGHT;

    const maxWidth = window.innerWidth - VIEWPORT_PADDING * 2;
    const width = Math.min(rect.width, maxWidth);

    const left = Math.min(
      Math.max(rect.left, VIEWPORT_PADDING),
      window.innerWidth - width - VIEWPORT_PADDING,
    );

    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_PADDING;
    const spaceAbove = rect.top - VIEWPORT_PADDING;

    const shouldOpenAbove =
      spaceBelow < popoverHeight + POPOVER_GAP && spaceAbove > spaceBelow;

    const preferredTop = shouldOpenAbove
      ? rect.top - popoverHeight - POPOVER_GAP
      : rect.bottom + POPOVER_GAP;

    const top = Math.min(
      Math.max(preferredTop, VIEWPORT_PADDING),
      window.innerHeight - popoverHeight - VIEWPORT_PADDING,
    );

    setPopoverStyle({
      top,
      left,
      width,
    });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const firstFrame = window.requestAnimationFrame(() => {
      updatePopoverPosition();

      window.requestAnimationFrame(updatePopoverPosition);
    });

    window.addEventListener("resize", updatePopoverPosition);
    window.addEventListener("scroll", updatePopoverPosition, true);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition, true);
    };
  }, [isOpen, updatePopoverPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isOpen &&
        !wrapperRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setIsOpen(false);
        setFieldTouched(name, true, true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, name, setFieldTouched]);

  useEffect(() => {
  if (!isOpen) return;

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key !== "Escape") return;

    event.preventDefault();
    event.stopImmediatePropagation();

    setIsOpen(false);
    inputRef.current?.focus();
  };

  document.addEventListener("keydown", handleEscape, true);

  return () => {
    document.removeEventListener("keydown", handleEscape, true);
  };
}, [isOpen]);

  const openCalendar = () => {
  setMonth(selectedDate ?? today);
  setIsOpen(true);
};

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value.replace(/[^\d-]/g, "").slice(0, 10);
    setFieldValue(name, nextValue, true);
  };

  const handleSelect = async (date: Date | undefined) => {
  if (!date) return;

  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  if (normalizedDate < getToday()) return;

  await setFieldValue(name, formatDateValue(normalizedDate), false);
  await setFieldTouched(name, true, false);
  await validateField(name);

  setIsOpen(false);

  inputRef.current?.focus();
};

  const canUsePortal = typeof document !== "undefined";

  const calendarPopover =
    canUsePortal && isOpen
      ? createPortal(
          <div
            ref={popoverRef}
            id={`${id}-calendar`}
            className={styles.calendarPopover}
            style={{
              top: popoverStyle.top,
              left: popoverStyle.left,
              width: popoverStyle.width,
              opacity: popoverStyle.width > 0 ? 1 : 0,
              pointerEvents: popoverStyle.width > 0 ? "auto" : "none",
            }}
            role="dialog"
            aria-label={t("date.calendarLabel")}
          >
            <DayPicker
              mode="single"
              selected={selectedDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              disabled={{ before: today }}
              locale={localeMap[locale as keyof typeof localeMap] || enUS}
              weekStartsOn={1}
              showOutsideDays
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
            />
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      className={`${fields.formGroup} ${styles.datePicker}`}
      ref={wrapperRef}
    >
      <label htmlFor={id} className={fields.label}>
        {label} {required && <span className={fields.required}>*</span>}
      </label>

      <div className={styles.dateInputWrap} ref={inputWrapRef}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          className={fields.input}
          aria-required={required}
  aria-invalid={Boolean(visibleError)}
  aria-describedby={
    [hintId, errorId].filter(Boolean).join(" ") || undefined
  }
  onClick={openCalendar}
  onChange={handleInputChange}
  onBlur={() => setFieldTouched(name, true, true)}
        />

        <button
          type="button"
          className={styles.dateToggle}
          aria-label={t("date.openCalendar")}
          aria-expanded={isOpen}
          aria-controls={`${id}-calendar`}
          onClick={() => {
            if (isOpen) setIsOpen(false);
            else openCalendar();
          }}
        >
          <span aria-hidden="true" />
        </button>
      </div>

      {calendarPopover}

      {hint && (
        <p id={hintId} className={fields.fieldHint}>
          {hint}
        </p>
      )}

      <div className={fields.errorSlot} id={`${id}-error`} aria-live="polite">
        <div
          className={`${fields.error} ${visibleError ? fields.visible : ""}`}
        >
          {visibleError || "\u00A0"}
        </div>
      </div>
    </div>
  );
}