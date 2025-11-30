export const formatMileage = (mileage: number): string => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km";
};

export const extractCityFromAddress = (address: string): string => {
  const parts = address.split(",");

  if (parts.length >= 2) {
    return parts[parts.length - 2]?.trim() || "";
  }
  return address;
};

export const extractCountryFromAddress = (address: string): string => {
  const parts = address.split(",");
  return parts[parts.length - 1]?.trim() || "Ukraine";
};
