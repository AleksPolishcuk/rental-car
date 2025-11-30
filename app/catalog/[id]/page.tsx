"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Car } from "@/types/car";
import { carApi } from "@/lib/api/api";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { SimpleLoader as Loader } from "@/components/UI/Loader/SimpleLoader";
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
  const shortId = car.id.slice(-4);

  return (
    <div className="container">
      {/* Mobile версія */}
      <div className={styles.mobileDetails}>
        {/* Зображення - перше */}
        <div className={styles.imageSection}>
          <Image
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            className={styles.carImage}
          />
        </div>

        {/* Деталі авто - другі */}
        <div className={styles.detailsContent}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <div className={styles.carId}>Id: {shortId}</div>
          </div>

          <div className={styles.locationRow}>
            <span className={styles.locationItem}>
              <svg className={styles.icon} width="16" height="16">
                <use xlinkHref="/symbol-defs.svg#icon-Location"></use>
              </svg>
              {city}, Ukraine
            </span>
            <span className={styles.locationItem}>
              Mileage: {formatMileage(car.mileage)}
            </span>
          </div>

          <div className={styles.price}>${car.rentalPrice}</div>

          <p className={styles.description}>{car.description}</p>

          <div className={styles.rentalConditions}>
            <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
            <div className={styles.conditionsGrid}>
              {car.rentalConditions.map((condition, index) => (
                <div key={index} className={styles.condition}>
                  <svg className={styles.checkIcon} width="16" height="16">
                    <use xlinkHref="/symbol-defs.svg#icon-check-circle"></use>
                  </svg>
                  {condition}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.specs}>
            <h3 className={styles.sectionTitle}>Car Specifications:</h3>
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-calendar"></use>
                </svg>
                Year: {car.year}
              </div>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-gear"></use>
                </svg>
                Type:{car.type}
              </div>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-fuel-pump"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </div>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-gear"></use>
                </svg>
                Engine Size: {car.engineSize}
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <h3 className={styles.sectionTitle}>
              Accessories and functionalities:
            </h3>
            <ul className={styles.featureList}>
              {car.accessories.map((item, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="16" height="16">
                    <use xlinkHref="/symbol-defs.svg#icon-check-circle"></use>
                  </svg>
                  {item}
                </li>
              ))}
              {car.functionalities.map((item, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="16" height="16">
                    <use xlinkHref="/symbol-defs.svg#icon-check-circle"></use>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Форма - остання */}
        <div className={styles.bookingSection}>
          <BookingForm carId={car.id} />
        </div>
      </div>

      {/* Tablet & Desktop версія (однакова структура) */}
      <div className={styles.details}>
        <div className={styles.leftColumn}>
          <div className={styles.imageSection}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={640}
              height={512}
              className={styles.carImage}
            />
          </div>

          <div className={styles.bookingSection}>
            <BookingForm carId={car.id} />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>
              {car.brand} {car.model}, {car.year}
            </h1>
            <div className={styles.carId}>Id: {shortId}</div>
          </div>

          <div className={styles.locationRow}>
            <span className={styles.locationItem}>
              <svg className={styles.icon} width="16" height="16">
                <use xlinkHref="/symbol-defs.svg#icon-Location"></use>
              </svg>
              {city}, Ukraine
            </span>
            <span className={styles.locationItem}>
              Mileage: {formatMileage(car.mileage)}
            </span>
          </div>

          <div className={styles.price}>${car.rentalPrice}</div>

          <p className={styles.description}>{car.description}</p>

          <div className={styles.rentalConditions}>
            <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
            <div className={styles.conditionsGrid}>
              {car.rentalConditions.map((condition, index) => (
                <div key={index} className={styles.condition}>
                  <svg className={styles.checkIcon} width="16" height="16">
                    <use xlinkHref="/symbol-defs.svg#icon-check-circle"></use>
                  </svg>
                  {condition}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.specs}>
            <h3 className={styles.sectionTitle}>Car Specifications:</h3>
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-calendar"></use>
                </svg>
                Year: {car.year}
              </div>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-car"></use>
                </svg>
                Type:{car.type}
              </div>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-fuel-pump"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </div>
              <div className={styles.specItem}>
                <svg className={styles.icon} width="16" height="16">
                  <use xlinkHref="/symbol-defs.svg#icon-gear"></use>
                </svg>
                Engine Size: {car.engineSize}
              </div>
            </div>
          </div>

          <div className={styles.features}>
            <h3 className={styles.sectionTitle}>
              Accessories and functionalities:
            </h3>
            <ul className={styles.featureList}>
              {car.accessories.map((item, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="16" height="16">
                    <use xlinkHref="/symbol-defs.svg#icon-check-circle"></use>
                  </svg>
                  {item}
                </li>
              ))}
              {car.functionalities.map((item, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="16" height="16">
                    <use xlinkHref="/symbol-defs.svg#icon-check-circle"></use>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
