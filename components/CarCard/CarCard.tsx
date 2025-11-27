"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types/car";
import { useCarStore } from "@/lib/store/carStore";
import {
  formatMileage,
  extractCityFromAddress,
  extractCountryFromAddress,
} from "@/lib/utils/format";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useCarStore();
  const isFavorite = favorites.includes(car.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car.id);
    }
  };

  const city = extractCityFromAddress(car.address);
  const country = extractCountryFromAddress(car.address);

  //  функція для обмеження назви моделі з урахуванням бренду
  const truncateModelName = (
    brand: string,
    model: string,
    totalMaxLength: number = 22
  ) => {
    const availableForModel = totalMaxLength - brand.length - 4;

    if (model.length <= availableForModel) {
      return model;
    }

    const minModelLength = 3;
    if (availableForModel < minModelLength) {
      return model.substring(0, minModelLength) + "...";
    }

    return model.substring(0, availableForModel) + "...";
  };

  const truncatedModel = truncateModelName(car.brand, car.model);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={276}
          height={268}
          className={styles.image}
        />
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg width="16" height="16" className={styles.heartIcon}>
            {isFavorite ? (
              <use href="/symbol-defs.svg#icon-Property-heartActive" />
            ) : (
              <use href="/symbol-defs.svg#icon-Property-heart1Default" />
            )}
          </svg>
        </button>
      </div>

      <div className={styles.cardHeader}>
        <h3 className={styles.title}>
          {car.brand}{" "}
          <span className={styles.model} title={car.model}>
            {truncatedModel}
          </span>
          , {car.year}
        </h3>
        <span className={styles.price}>${car.rentalPrice}</span>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.location}>
          <span className={styles.city}>{city}</span>
          <span className={styles.divider}>|</span>
          <span className={styles.country}>{country}</span>
          <span className={styles.divider}>|</span>
          <span className={styles.rentalCompany}>{car.rentalCompany}</span>
          <span className={styles.divider}>|</span>
        </div>
        <div className={styles.details}>
          <span className={styles.type}>{car.type}</span>
          <span className={styles.divider}>|</span>
          <span className={styles.mileage}>{formatMileage(car.mileage)}</span>
        </div>
      </div>

      <Link href={`/catalog/${car.id}`} className={styles.readMore}>
        Read more
      </Link>
    </div>
  );
};
