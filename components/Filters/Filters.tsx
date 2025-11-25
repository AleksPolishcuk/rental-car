"use client";

import React, { useState, useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import { carApi } from "@/lib/api/api";
import styles from "./Filters.module.css";

export const Filters: React.FC = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const { filters, setFilters, fetchCars } = useCarStore();

  useEffect(() => {
    carApi.getBrands().then(setBrands).catch(console.error);
  }, []);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchCars(updatedFilters, 1);
  };

  const handleMileageChange = (type: "from" | "to", value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    handleFilterChange({
      mileageFrom: type === "from" ? numValue : filters.mileageFrom,
      mileageTo: type === "to" ? numValue : filters.mileageTo,
    });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Car brand</label>
        <select
          value={filters.brand || ""}
          onChange={(e) =>
            handleFilterChange({ brand: e.target.value || undefined })
          }
          className={styles.select}
        >
          <option value="">Choose a brand</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Price/ 1 hour</label>
        <select
          value={filters.price || ""}
          onChange={(e) =>
            handleFilterChange({ price: e.target.value || undefined })
          }
          className={styles.select}
        >
          <option value="">Choose a price</option>
          <option value="30">To $30</option>
          <option value="40">To $40</option>
          <option value="50">To $50</option>
          <option value="60">To $60</option>
          <option value="70">To $70</option>
          <option value="80">To $80</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Car mileage / km</label>
        <div className={styles.mileageInputs}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputLabel}>From</span>
            <input
              type="number"
              placeholder="0"
              value={filters.mileageFrom || ""}
              onChange={(e) => handleMileageChange("from", e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <span className={styles.inputLabel}>To</span>
            <input
              type="number"
              placeholder="100000"
              value={filters.mileageTo || ""}
              onChange={(e) => handleMileageChange("to", e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
