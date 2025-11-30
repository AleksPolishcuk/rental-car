"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Car } from "@/types/car";
import { carApi } from "@/lib/api/api";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import { SimpleLoader as Loader } from "@/components/UI/Loader/SimpleLoader";
import { CarInfoSection } from "./CarInfoSection";
import { CarImageSection } from "./CarImageSection";
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

  return (
    <div className="container">
      <div className={styles.mobileDetails}>
        <CarImageSection car={car} />
        <div className={styles.detailsContent}>
          <CarInfoSection car={car} isMobile={true} />
        </div>
        <div className={styles.bookingSection}>
          <BookingForm carId={car.id} />
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.leftColumn}>
          <CarImageSection car={car} />
          <div className={styles.bookingSection}>
            <BookingForm carId={car.id} />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <CarInfoSection car={car} isMobile={false} />
        </div>
      </div>
    </div>
  );
}
