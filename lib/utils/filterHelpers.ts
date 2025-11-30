import { LocalFilters, ApiFilters } from "@/types/filters";

export const formatNumber = (value: string): string => {
  if (!value) return "";
  const number = value.replace(/\D/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseFormattedNumber = (value: string): string => {
  return value.replace(/,/g, "");
};

export const validateMileageRange = (from: string, to: string): boolean => {
  if (!from || !to) return true;

  const fromNum = Number(parseFormattedNumber(from));
  const toNum = Number(parseFormattedNumber(to));

  return fromNum <= toNum;
};

export const normalizeFilters = (filters: LocalFilters): ApiFilters => {
  return {
    brand: filters.brand || undefined,
    price: filters.price || undefined,
    mileageFrom: filters.mileageFrom ? Number(filters.mileageFrom) : undefined,
    mileageTo: filters.mileageTo ? Number(filters.mileageTo) : undefined,
  };
};

export const hasActiveFilters = (filters: LocalFilters): boolean => {
  return Object.values(filters).some((value) => value !== "");
};
