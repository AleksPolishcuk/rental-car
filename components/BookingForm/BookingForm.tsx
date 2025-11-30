"use client";

import React, { useState } from "react";
import { BookingFormData } from "@/types/car";
import { carApi } from "@/lib/api/api";
import { CustomDatePicker } from "@/components/UI/Input/CustomDatePicker";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  carId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  bookingDate?: string;
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Валідаційні функції українською
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) {
      return "Name is required.";
    }
    if (name.trim().length < 2) {
      return "Name must contain at least 2 characters";
    }
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return undefined;
  };

  const validateField = (name: string, value: string) => {
    let error: string | undefined;

    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      default:
        error = undefined;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.bookingDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = {
      name: true,
      email: true,
      bookingDate: true,
    };
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await carApi.bookCar(carId, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", bookingDate: "", comment: "" });
      setErrors({});
      setTouched({});

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

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({ ...prev, bookingDate: date }));

    if (touched.bookingDate) {
      validateField("bookingDate", date);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleDateBlur = () => {
    setTouched((prev) => ({ ...prev, bookingDate: true }));
    validateField("bookingDate", formData.bookingDate);
  };

  if (submitted) {
    return (
      <div className={styles.successMessage}>
        <h3>Success!</h3>
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
          onBlur={handleBlur}
          className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}
          required
        />
        {touched.name && errors.name && (
          <div className={styles.errorMessage}>{errors.name}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}
          required
        />
        {touched.email && errors.email && (
          <div className={styles.errorMessage}>{errors.email}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <CustomDatePicker
          value={formData.bookingDate}
          onChange={handleDateChange}
          required
        />
        {touched.bookingDate && errors.bookingDate && (
          <div className={styles.errorMessage}>{errors.bookingDate}</div>
        )}
      </div>

      <div className={styles.formGroup}>
        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
          onBlur={handleBlur}
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
