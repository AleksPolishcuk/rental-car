"use client";

import React from "react";
import Image from "next/image";
import { Car } from "@/types/car";
import styles from "./CarDetails.module.css";

interface CarImageSectionProps {
  car: Car;
}

export const CarImageSection: React.FC<CarImageSectionProps> = ({ car }) => {
  return (
    <div className={styles.imageSection}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={640}
        height={512}
        className={styles.carImage}
        priority
      />
    </div>
  );
};
