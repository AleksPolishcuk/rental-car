"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import { CarCard } from "@/components/CarCard/CarCard";
import { Filters } from "@/components/Filters/Filters";
import { Loader } from "@/components/UI/Loader/Loader";
import { Button } from "@/components/UI/Button/Button";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { cars, loading, hasMore, loadMoreCars, fetchCars, loadFavorites } =
    useCarStore();

  useEffect(() => {
    loadFavorites();
    if (cars.length === 0) {
      fetchCars();
    }
  }, []);

  const handleLoadMore = () => {
    loadMoreCars();
  };

  return (
    <div className="container">
      <div className={styles.catalog}>
        <h1 className={styles.title}>Car Catalog</h1>

        <Filters />

        {cars.length === 0 && !loading ? (
          <div className={styles.noResults}>
            <p>No cars found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className={styles.carsGrid}>
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>

            {loading && <Loader />}

            {hasMore && (
              <div className={styles.loadMoreContainer}>
                <Button
                  onClick={handleLoadMore}
                  variant="primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load more"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
