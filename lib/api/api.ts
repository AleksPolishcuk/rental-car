import axios from "axios";
import { Car, CarsResponse, BookingFormData } from "../../types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const carApi = {
  getCars: (params?: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: number;
    maxMileage?: number;
    page?: number;
  }): Promise<CarsResponse> =>
    api.get("/cars", { params }).then((res) => res.data),

  getBrands: (): Promise<string[]> => api.get("/brands").then((r) => r.data),

  getCarById: (id: string): Promise<Car> =>
    api.get(`/cars/${id}`).then((r) => r.data),

  bookCar: (id: string, data: BookingFormData): Promise<void> =>
    api.post(`/cars/${id}/booking`, data),
};
