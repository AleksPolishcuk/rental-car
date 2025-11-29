"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import Filters from "@/components/Filters/Filters";
import { CarCard } from "@/components/CarCard/CarCard";
import { SimpleLoader as Loader } from "@/components/UI/Loader/SimpleLoader";
import { Button } from "@/components/UI/Button/Button";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { cars, loading, hasMore, loadMoreCars, fetchCars, loadFavorites } =
    useCarStore();

  useEffect(() => {
    loadFavorites();
    fetchCars({}, 1);
  }, []);

  const isInitialLoad = loading && cars.length === 0;
  const isLoadingMore = loading && cars.length > 0;

  return (
    <div className="container">
      <div className={styles.catalog}>
        <Filters />

        {isInitialLoad && (
          <div className={styles.globalLoader}>
            <Loader />
          </div>
        )}

        {!isInitialLoad && cars.length === 0 ? (
          <div className={styles.noResults}>
            <p>No cars found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className={styles.carsGrid}>
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}

              {isLoadingMore && (
                <div className={styles.loaderContainer}>
                  <Loader />
                </div>
              )}
            </div>

            {!loading && hasMore && (
              <div className={styles.loadMoreContainer}>
                <Button onClick={loadMoreCars} variant="primary">
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
