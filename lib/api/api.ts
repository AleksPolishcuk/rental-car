import axios from "axios";
import { Car, CarsResponse, BookingFormData } from "../../types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

export const carApi = {
  getCars: (params?: {
    make?: string;
    rentalPrice?: string;
    mileageFrom?: number;
    mileageTo?: number;
    page?: number;
  }): Promise<CarsResponse> =>
    api.get("/cars", { params }).then((res) => res.data),

  getCarById: (id: string): Promise<Car> =>
    api.get(`/cars/${id}`).then((res) => res.data),

  getBrands: (): Promise<string[]> =>
    api.get("/brands").then((res) => res.data),

  bookCar: (carId: string, data: BookingFormData): Promise<void> =>
    api.post(`/cars/${carId}/booking`, data),
};
