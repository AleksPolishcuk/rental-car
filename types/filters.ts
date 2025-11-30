import { FILTER_KEYS } from "@/app/constants/filter";

export interface SelectOption {
  value: string;
  label: string;
}

export interface LocalFilters {
  [FILTER_KEYS.BRAND]: string;
  [FILTER_KEYS.PRICE]: string;
  [FILTER_KEYS.MILEAGE_FROM]: string;
  [FILTER_KEYS.MILEAGE_TO]: string;
}

export interface ApiFilters {
  brand?: string;
  price?: string;
  mileageFrom?: number;
  mileageTo?: number;
}

export interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  placeholder: string;
  testId?: string;
}
