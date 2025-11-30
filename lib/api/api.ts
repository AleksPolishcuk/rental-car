import axios from "axios";
import { Car, CarsResponse, BookingFormData } from "../../types/car";

interface ApiParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: number;
  maxMileage?: number;
  page?: number;
}

const api = axios.create({
  baseURL: "https://car-rental-api.goit.global",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Request failed:", error);
    return Promise.reject(error);
  }
);

export const carApi = {
  getCars: async (params?: ApiParams): Promise<CarsResponse> => {
    try {
      const response = await api.get("/cars", { params });
      return response.data;
    } catch (error) {
      console.error("API Error in getCars:", error);
      throw new Error("Failed to fetch cars. Please try again later.");
    }
  },

  getBrands: async (): Promise<string[]> => {
    try {
      const response = await api.get("/brands");
      return response.data;
    } catch (error) {
      console.error("API Error in getBrands:", error);
      throw new Error("Failed to fetch car brands.");
    }
  },

  getCarById: async (id: string): Promise<Car> => {
    try {
      const response = await api.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      console.error(`API Error in getCarById for id ${id}:`, error);
      throw new Error("Failed to fetch car details.");
    }
  },

  bookCar: async (id: string, data: BookingFormData): Promise<void> => {
    try {
      await api.post(`/cars/${id}/booking`, data);
    } catch (error) {
      console.error(`API Error in bookCar for id ${id}:`, error);
      throw new Error("Failed to book car. Please try again.");
    }
  },
};
