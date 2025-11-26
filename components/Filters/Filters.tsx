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
      {/* BRAND */}
      <div className={styles.field}>
        <label className={styles.label}>Car brand</label>

        <div className={styles.selectBox}>
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
      </div>

      {/* PRICE */}
      <div className={styles.field}>
        <label className={styles.label}>Price / 1 hour</label>

        <div className={styles.selectBox}>
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

      {/* MILEAGE */}
      <div className={styles.field}>
        <label className={styles.label}>Car mileage / km</label>

        <div className={styles.mileageBox}>
          <input
            type="number"
            placeholder="From"
            className={styles.mileageInputFrom}
            value={localFilters.mileageFrom}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                mileageFrom: e.target.value,
              })
            }
          />

          <span className={styles.mileageDivider}></span>

          <input
            type="number"
            placeholder="To"
            className={styles.mileageInputTo}
            value={localFilters.mileageTo}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                mileageTo: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* SEARCH BUTTON */}
      <button className={styles.searchBtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
