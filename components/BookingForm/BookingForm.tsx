"use client";

import React, { useState } from "react";
import { BookingFormData } from "@/types/car";
import { carApi } from "@/lib/api/api";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  carId: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ carId }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await carApi.bookCar(carId, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", bookingDate: "", comment: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <h3>🎉 Success!</h3>
        <p>Your car has been booked successfully!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.formTitle}>Book your car now</h3>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          className={styles.textarea}
          rows={4}
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Booking..." : "Send"}
      </button>
    </form>
  );
};
