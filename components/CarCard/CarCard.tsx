"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Car } from "@/types/car";
import { useCarStore } from "@/lib/store/carStore";
import { formatMileage, extractCityFromAddress } from "@/lib/utils/format";
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

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={300}
          height={200}
          className={styles.image}
        />
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favorite : ""}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className={styles.cardHeader}>
        <h3 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
          {car.year}
        </h3>
        <span className={styles.price}>${car.rentalPrice}</span>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.location}>
          {city} | {car.rentalCompany}
        </div>
        <div className={styles.details}>
          <span>{car.type}</span>
          <span>{formatMileage(car.mileage)}</span>
        </div>
      </div>

      <p className={styles.description}>{car.description}</p>

      <Link href={`/catalog/${car.id}`} className={styles.readMore}>
        Read more
      </Link>
    </div>
  );
};
