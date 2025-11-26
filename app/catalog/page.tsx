"use client";

import React, { useEffect } from "react";
import { useCarStore } from "@/lib/store/carStore";
import Filters from "@/components/Filters/Filters";
import { CarCard } from "@/components/CarCard/CarCard";
import { Loader } from "@/components/UI/Loader/Loader";
import { Button } from "@/components/UI/Button/Button";
import styles from "./CatalogPage.module.css";

export default function CatalogPage() {
  const { cars, loading, hasMore, loadMoreCars, fetchCars, loadFavorites } =
    useCarStore();

  useEffect(() => {
    loadFavorites();
    fetchCars({}, 1);
  }, []);

  return (
    <div className="container">
      <div className={styles.catalog}>
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
