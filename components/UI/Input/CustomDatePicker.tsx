"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  format,
  parse,
  isValid,
  isMatch,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";
import styles from "./CustomDatePicker.module.css";

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDateValid, setIsDateValid] = useState(true);
  const [showCalendarButton, setShowCalendarButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
  const today = startOfDay(new Date());

  const isDateSelectable = useCallback(
    (date: Date): boolean => {
      return isValid(date) && !isBefore(date, today);
    },
    [today]
  );

  const formatDisplayValue = useCallback((dateValue: string): string => {
    if (!dateValue) return "";

    try {
      const date = parse(dateValue, "yyyy-MM-dd", new Date());
      return isValid(date) ? format(date, "dd.MM.yyyy") : "";
    } catch {
      return "";
    }
  }, []);

  const formatInputValue = useCallback((value: string): string => {
    const digitsOnly = value.replace(/\D/g, "");
    const limitedDigits = digitsOnly.substring(0, 8);

    let formatted = "";
    for (let i = 0; i < limitedDigits.length; i++) {
      if (i === 2 || i === 4) {
        formatted += ".";
      }
      formatted += limitedDigits[i];
    }

    return formatted;
  }, []);

  const parseInputValue = useCallback(
    (value: string): string | null => {
      if (value.length !== 10) {
        return null;
      }

      const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
      if (!dateRegex.test(value)) {
        return null;
      }

      if (!isMatch(value, "dd.MM.yyyy")) {
        return null;
      }

      try {
        const date = parse(value, "dd.MM.yyyy", new Date());

        if (!isValid(date)) {
          return null;
        }

        if (isBefore(date, today)) {
          return null;
        }

        return format(date, "yyyy-MM-dd");
      } catch (error) {
        return null;
      }
    },
    [today]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const formattedValue = formatInputValue(rawValue);
    setInputValue(formattedValue);

    if (formattedValue.length === 10) {
      const parsedDate = parseInputValue(formattedValue);

      if (parsedDate) {
        onChange(parsedDate);
        setCurrentMonth(parse(parsedDate, "yyyy-MM-dd", new Date()));
        setIsDateValid(true);
      } else {
        onChange("");
        setIsDateValid(false);
      }
    } else {
      onChange("");
      setIsDateValid(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (
      !allowedKeys.includes(e.key) &&
      !/\d/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === "v") {
      setTimeout(() => {
        const currentValue = e.currentTarget.value;
        const formattedValue = formatInputValue(currentValue);
        setInputValue(formattedValue);

        if (formattedValue.length === 10) {
          const parsedDate = parseInputValue(formattedValue);
          if (parsedDate) {
            onChange(parsedDate);
            setIsDateValid(true);
          } else {
            setIsDateValid(false);
          }
        }
      }, 0);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const formattedText = formatInputValue(pastedText);

    setInputValue(formattedText);

    if (formattedText.length === 10) {
      const parsedDate = parseInputValue(formattedText);
      if (parsedDate) {
        onChange(parsedDate);
        setIsDateValid(true);
      } else {
        setIsDateValid(false);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsDateValid(true);
    setShowCalendarButton(true);
  };

  const handleBlur = () => {
    setIsFocused(false);

    setTimeout(() => {
      if (!showCalendar) {
        setShowCalendarButton(false);
      }
    }, 200);

    if (inputValue) {
      if (inputValue.length === 10) {
        const parsedDate = parseInputValue(inputValue);
        setIsDateValid(!!parsedDate);
      } else if (inputValue.length > 0) {
        setIsDateValid(false);
      }
    }
  };

  const handleCalendarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCalendar(!showCalendar);
    setIsDateValid(true);
    setShowCalendarButton(true);
  };

  const handleDateSelect = (date: Date) => {
    if (isDateSelectable(date) && isSameMonth(date, currentMonth)) {
      const formattedDate = format(date, "yyyy-MM-dd");
      onChange(formattedDate);
      setInputValue(format(date, "dd.MM.yyyy"));
      setIsDateValid(true);
      setTimeout(() => {
        setShowCalendar(false);
        setShowCalendarButton(false);
      }, 10);
    } else {
      setIsDateValid(false);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const getPlaceholderText = (): string => {
    return isFocused ? "ДД.ММ.РРРР" : "Booking date";
  };

  const generateCalendarDays = useCallback(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    });

    return days.map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, currentMonth),
      isToday: isToday(date),
      isSelectable: isDateSelectable(date) && isSameMonth(date, currentMonth),
    }));
  }, [currentMonth, isDateSelectable]);

  const calendarDays = generateCalendarDays();

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={`${styles.customInputContainer} ${
          !isDateValid ? styles.invalid : ""
        }`}
        onBlur={handleBlur}
        tabIndex={-1}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          className={styles.textInput}
          placeholder={getPlaceholderText()}
          maxLength={10}
        />

        {(showCalendarButton || showCalendar) && (
          <button
            type="button"
            className={styles.calendarButton}
            onClick={handleCalendarClick}
            aria-label="Open calendar"
          >
            <svg width="20" height="20" className={styles.calendarIcon}>
              <use xlinkHref="/symbol-defs.svg#icon-calendar"></use>
            </svg>
          </button>
        )}
      </div>

      {!isDateValid && (
        <div className={styles.errorMessage}>
          Введіть або виберіть іншу дату
        </div>
      )}

      {showCalendar && (
        <div className={styles.calendarDropdown} ref={calendarRef}>
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navButton}
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className={styles.currentMonth}>
              {format(currentMonth, "MMMM yyyy")}
            </span>

            <button
              type="button"
              className={styles.navButton}
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.weekDays}>
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <div key={day} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {calendarDays.map(
              ({ date, isCurrentMonth, isSelectable }, index) => {
                const isSelected =
                  selectedDate && isSameDay(date, selectedDate);

                return (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.calendarDay} ${
                      !isCurrentMonth ? styles.otherMonth : ""
                    } ${isSelected ? styles.selected : ""} ${
                      isToday(date) ? styles.today : ""
                    } ${!isSelectable ? styles.notSelectable : ""}`}
                    onClick={() => handleDateSelect(date)}
                    disabled={!isSelectable}
                  >
                    {format(date, "d")}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};
