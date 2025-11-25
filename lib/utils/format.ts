export const formatMileage = (mileage: number): string => {
  return mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " km";
};

export const extractCityFromAddress = (address: string): string => {
  const cityMatch = address.match(/([A-Za-z\u0400-\u04FF]+)(?=,)/);
  return cityMatch ? cityMatch[1] : address.split(",")[0]?.trim() || "";
};
