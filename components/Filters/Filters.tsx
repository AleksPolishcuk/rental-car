"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useCarStore } from "@/lib/store/carStore";
import { carApi } from "@/lib/api/api";
import {
  FILTER_KEYS,
  DEFAULT_FILTERS,
  PRICE_OPTIONS,
  MILEAGE_PLACEHOLDERS,
  TEST_IDS,
  ERROR_MESSAGES,
} from "@/app/constants/filter";
import { LocalFilters, CustomSelectProps } from "@/types/filters";
import {
  formatNumber,
  parseFormattedNumber,
  validateMileageRange,
  normalizeFilters,
  hasActiveFilters,
} from "@/lib/utils/filterHelpers";
import styles from "./Filters.module.css";

const CustomSelect: React.FC<CustomSelectProps> = React.memo(
  ({ value, onChange, options, placeholder, testId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = useCallback(
      (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
      },
      [onChange]
    );

    const handleClickOutside = useCallback((event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    const selectedOption = options.find((opt) => opt.value === value);
    const displayValue = selectedOption ? selectedOption.label : placeholder;

    return (
      <div className={styles.customSelect} ref={selectRef} data-testid={testId}>
        <div
          className={`${styles.selectTrigger} ${isOpen ? styles.open : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={value ? styles.selectedValue : styles.placeholder}>
            {displayValue}
          </span>
          <svg
            className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}
            width="16"
            height="16"
            aria-hidden="true"
          >
            <use href="/symbol-defs.svg#icon-Property-1Default" />
          </svg>
        </div>
        {isOpen && (
          <div
            className={styles.optionsList}
            role="listbox"
            aria-label={placeholder}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  option.value === value ? styles.selected : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default function Filters() {
  const [brands, setBrands] = useState<string[]>([]);
  const [localFilters, setLocalFilters] =
    useState<LocalFilters>(DEFAULT_FILTERS);
  const [searchError, setSearchError] = useState<string>("");

  const { setFilters, resetSearch, fetchCars } = useCarStore();

  useEffect(() => {
    let isMounted = true;

    const loadBrands = async () => {
      try {
        const brandsList = await carApi.getBrands();
        if (isMounted) {
          setBrands(brandsList);
        }
      } catch (error) {
        console.error(ERROR_MESSAGES.BRANDS_LOAD_FAILED, error);
      }
    };

    loadBrands();

    return () => {
      isMounted = false;
    };
  }, []);

  const brandOptions = useMemo(
    () => [
      { value: "", label: "Choose a brand" },
      ...brands.map((brand) => ({ value: brand, label: brand })),
    ],
    [brands]
  );

  const handleFilterChange = useCallback(
    (filterKey: keyof LocalFilters, value: string) => {
      setLocalFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }));
      setSearchError("");
    },
    []
  );

  const handleMileageFromChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseFormattedNumber(e.target.value);
      handleFilterChange(FILTER_KEYS.MILEAGE_FROM, rawValue);
    },
    [handleFilterChange]
  );

  const handleMileageToChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = parseFormattedNumber(e.target.value);
      handleFilterChange(FILTER_KEYS.MILEAGE_TO, rawValue);
    },
    [handleFilterChange]
  );

  const handleSearch = useCallback(async () => {
    if (
      !validateMileageRange(localFilters.mileageFrom, localFilters.mileageTo)
    ) {
      setSearchError(ERROR_MESSAGES.INVALID_MILEAGE_RANGE);
      return;
    }

    setSearchError("");

    try {
      resetSearch();
      const normalizedFilters = normalizeFilters(localFilters);

      setFilters(normalizedFilters);
      await fetchCars(normalizedFilters, 1, true);
    } catch (error) {
      console.error(ERROR_MESSAGES.SEARCH_FAILED, error);
      setSearchError(ERROR_MESSAGES.SEARCH_FAILED);
    }
  }, [localFilters, resetSearch, setFilters, fetchCars]);

  const handleReset = useCallback(() => {
    setLocalFilters(DEFAULT_FILTERS);
    setSearchError("");
    resetSearch();
    fetchCars({}, 1, true);
  }, [resetSearch, fetchCars]);

  const activeFilters = useMemo(
    () => hasActiveFilters(localFilters),
    [localFilters]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className={styles.wrapper} onKeyPress={handleKeyPress}>
      <div className={styles.filtersRow}>
        {/* Бренд */}
        <div className={styles.field}>
          <label htmlFor={TEST_IDS.BRAND_SELECT} className={styles.label}>
            Car brand
          </label>
          <CustomSelect
            value={localFilters.brand}
            onChange={(value) => handleFilterChange(FILTER_KEYS.BRAND, value)}
            options={brandOptions}
            placeholder="Choose a brand"
            testId={TEST_IDS.BRAND_SELECT}
          />
        </div>

        {/* Ціна */}
        <div className={styles.field}>
          <label htmlFor={TEST_IDS.PRICE_SELECT} className={styles.label}>
            Price / 1 hour
          </label>
          <CustomSelect
            value={localFilters.price}
            onChange={(value) => handleFilterChange(FILTER_KEYS.PRICE, value)}
            options={PRICE_OPTIONS}
            placeholder="To $"
            testId={TEST_IDS.PRICE_SELECT}
          />
        </div>
      </div>

      {/* Пробіг */}
      <div className={styles.mileageField}>
        <label className={styles.label}>Car mileage / km</label>
        <div className={styles.mileageBox}>
          <div className={styles.mileageInputWrapper}>
            <span className={styles.mileageLabel}>From</span>
            <input
              type="text"
              className={styles.mileageInput}
              value={formatNumber(localFilters.mileageFrom)}
              onChange={handleMileageFromChange}
              placeholder={MILEAGE_PLACEHOLDERS.FROM}
              aria-label="Minimum mileage"
            />
          </div>
          <span className={styles.mileageDivider} aria-hidden="true"></span>
          <div className={styles.mileageInputWrapper}>
            <span className={styles.mileageLabel}>To</span>
            <input
              type="text"
              className={styles.mileageInput}
              value={formatNumber(localFilters.mileageTo)}
              onChange={handleMileageToChange}
              placeholder={MILEAGE_PLACEHOLDERS.TO}
              aria-label="Maximum mileage"
            />
          </div>
        </div>
      </div>

      <div className={styles.searchButtonContainer}>
        <button
          className={styles.searchBtn}
          onClick={handleSearch}
          aria-label="Search cars"
        >
          Search
        </button>

        {activeFilters && (
          <button
            className={styles.resetBtn}
            onClick={handleReset}
            aria-label="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>

      {searchError && <div className={styles.searchError}>{searchError}</div>}
    </div>
  );
}
