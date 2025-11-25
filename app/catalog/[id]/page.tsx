"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Car } from "@/types/car";
import { carApi } from "@/lib/api/api";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { Loader } from "@/components/UI/Loader/Loader";
import { formatMileage, extractCityFromAddress } from "@/lib/utils/format";
import styles from "./CarDetails.module.css";

export default function CarDetailsPage() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      carApi
        .getCarById(params.id as string)
        .then(setCar)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  if (loading) return <Loader />;
  if (!car) return <div className={styles.notFound}>Car not found</div>;

  const city = extractCityFromAddress(car.address);

  return (
    <div className="container">
      <div className={styles.details}>
        <div className={styles.carInfo}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={600}
            height={400}
            className={styles.carImage}
          />

          <div className={styles.mainInfo}>
            <h1 className={styles.title}>
              {car.brand} {car.model}, {car.year}
            </h1>

            <div className={styles.location}>
              <span>{city}, Ukraine</span>
              <span>{car.rentalCompany}</span>
              <span>{formatMileage(car.mileage)}</span>
            </div>

            <p className={styles.description}>{car.description}</p>

            <div className={styles.specs}>
              <h3>Car Specifications:</h3>
              <div className={styles.specsGrid}>
                <div>
                  <strong>Year:</strong> {car.year}
                </div>
                <div>
                  <strong>Type:</strong> {car.type}
                </div>
                <div>
                  <strong>Fuel Consumption:</strong> {car.fuelConsumption}
                </div>
                <div>
                  <strong>Engine Size:</strong> {car.engineSize}
                </div>
              </div>
            </div>

            <div className={styles.accessories}>
              <h3>Accessories:</h3>
              <ul>
                {car.accessories.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.functionalities}>
              <h3>Functionalities:</h3>
              <ul>
                {car.functionalities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.rentalConditions}>
              <h3>Rental Conditions:</h3>
              <div className={styles.conditionsGrid}>
                {car.rentalConditions.map((condition, index) => (
                  <div key={index} className={styles.condition}>
                    {condition}
                  </div>
                ))}
                <div className={styles.condition}>
                  Mileage: {formatMileage(car.mileage)}
                </div>
                <div className={styles.condition}>
                  Price: ${car.rentalPrice}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bookingSection}>
          <BookingForm carId={car.id} />
        </div>
      </div>
    </div>
  );
}
