"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCarStore } from "@/lib/store/carStore";
import { carApi } from "@/lib/api/api";
import styles from "./Filters.module.css";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <div
        className={`${styles.selectTrigger} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? styles.selectedValue : styles.placeholder}>
          {displayValue}
        </span>
        <svg
          className={`${styles.arrow} ${isOpen ? styles.rotated : ""}`}
          width="16"
          height="16"
        >
          <use href="/symbol-defs.svg#icon-Property-1Default" />
        </svg>
      </div>
      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${
                option.value === value ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Filters() {
  const [brands, setBrands] = useState<string[]>([]);

  const { setFilters, resetSearch, fetchCars } = useCarStore();

  const [localFilters, setLocalFilters] = useState({
    brand: "",
    price: "",
    mileageFrom: "",
    mileageTo: "",
  });

  // Load brands
  useEffect(() => {
    (async () => {
      try {
        const list = await carApi.getBrands();
        setBrands(list);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const brandOptions = [
    { value: "", label: "Choose a brand" },
    ...brands.map((brand) => ({ value: brand, label: brand })),
  ];

  const priceOptions = [
    { value: "", label: "Choose a price" },
    { value: "30", label: "30" },
    { value: "40", label: "40" },
    { value: "50", label: "50" },
    { value: "60", label: "60" },
    { value: "70", label: "70" },
    { value: "80", label: "80" },
  ];

  const formatNumber = (value: string): string => {
    if (!value) return "";
    const number = value.replace(/\D/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMileageFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setLocalFilters({
      ...localFilters,
      mileageFrom: rawValue,
    });
  };

  const handleMileageToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    setLocalFilters({
      ...localFilters,
      mileageTo: rawValue,
    });
  };

  const handleSearch = () => {
    resetSearch();

    const normalized = {
      brand: localFilters.brand || undefined,
      price: localFilters.price || undefined,
      mileageFrom: localFilters.mileageFrom
        ? Number(localFilters.mileageFrom)
        : undefined,
      mileageTo: localFilters.mileageTo
        ? Number(localFilters.mileageTo)
        : undefined,
    };

    setFilters(normalized);
    fetchCars(normalized, 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filtersRow}>
        {/* BRAND */}
        <div className={styles.field}>
          <label className={styles.label}>Car brand</label>
          <CustomSelect
            value={localFilters.brand}
            onChange={(value) =>
              setLocalFilters({ ...localFilters, brand: value })
            }
            options={brandOptions}
            placeholder="Choose a brand"
          />
        </div>

        {/* PRICE */}
        <div className={styles.field}>
          <label className={styles.label}>Price / 1 hour</label>
          <CustomSelect
            value={localFilters.price}
            onChange={(value) =>
              setLocalFilters({ ...localFilters, price: value })
            }
            options={priceOptions}
            placeholder="Choose a price"
          />
        </div>
      </div>

      {/* MILEAGE */}
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
            />
          </div>
          <span className={styles.mileageDivider}></span>
          <div className={styles.mileageInputWrapper}>
            <span className={styles.mileageLabel}>To</span>
            <input
              type="text"
              className={styles.mileageInput}
              value={formatNumber(localFilters.mileageTo)}
              onChange={handleMileageToChange}
            />
          </div>
        </div>
      </div>

      <div className={styles.searchButtonContainer}>
        <button className={styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
