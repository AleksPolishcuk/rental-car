export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface Filters {
  brand?: string;
  price?: string;
  mileageFrom?: number;
  mileageTo?: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  bookingDate: string;
  comment: string;
}

export interface ApiParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ErrorResponse {
  message: string;
  status: number;
  code?: string;
}

export interface CarInfoSectionProps {
  car: Car;
  isMobile?: boolean;
}

export interface CarImageSectionProps {
  car: Car;
}
