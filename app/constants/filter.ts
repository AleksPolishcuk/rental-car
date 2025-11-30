export const FILTER_KEYS = {
  BRAND: "brand",
  PRICE: "price",
  MILEAGE_FROM: "mileageFrom",
  MILEAGE_TO: "mileageTo",
} as const;

export const DEFAULT_FILTERS = {
  [FILTER_KEYS.BRAND]: "",
  [FILTER_KEYS.PRICE]: "",
  [FILTER_KEYS.MILEAGE_FROM]: "",
  [FILTER_KEYS.MILEAGE_TO]: "",
} as const;

export const PRICE_OPTIONS = [
  { value: "", label: "Choose a price" },
  { value: "30", label: "To $30" },
  { value: "40", label: "To $40" },
  { value: "50", label: "To $50" },
  { value: "60", label: "To $60" },
  { value: "70", label: "To $70" },
  { value: "80", label: "To $80" },
] as const;

export const MILEAGE_PLACEHOLDERS = {
  FROM: " ",
  TO: " ",
} as const;

export const TEST_IDS = {
  BRAND_SELECT: "brand-select",
  PRICE_SELECT: "price-select",
} as const;

export const ERROR_MESSAGES = {
  INVALID_MILEAGE_RANGE:
    "Minimum mileage cannot be greater than maximum mileage",
  SEARCH_FAILED: "Search failed. Please try again.",
  BRANDS_LOAD_FAILED: "Failed to load car brands",
} as const;
