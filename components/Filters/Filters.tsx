"use client";

import React, { useState, useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import { carApi } from "@/lib/api/api";
import styles from "./Filters.module.css";

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

  // Функція для форматування числа з роздільниками тисяч
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
      {/* Контейнер для перших двох фільтрів - тільки для таблету */}
      <div className={styles.filtersRow}>
        {/* BRAND */}
        <div className={styles.field}>
          <label className={styles.label}>Car brand</label>
          <select
            className={styles.select}
            value={localFilters.brand}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, brand: e.target.value })
            }
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
        </div>

        {/* PRICE */}
        <div className={styles.field}>
          <label className={styles.label}>Price / 1 hour</label>
          <select
            className={styles.select}
            value={localFilters.price}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, price: e.target.value })
            }
          >
            <option value="">Choose a price</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="80">80</option>
          </select>
        </div>
      </div>

      {/* MILEAGE - під першими двома фільтрами */}
      <div className={styles.field}>
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

      {/* SEARCH BUTTON - під mileage */}
      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
