import { create } from "zustand";
import { Car, Filters } from "../../types/car";
import { carApi } from "../api/api";

interface CarState {
  cars: Car[];
  favorites: string[];
  filters: Filters;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;

  fetchCars: (
    filters?: Filters,
    page?: number,
    reset?: boolean
  ) => Promise<void>;
  loadMoreCars: () => Promise<void>;
  setFilters: (filters: Filters) => void;
  resetSearch: () => void;
  addToFavorites: (carId: string) => void;
  removeFromFavorites: (carId: string) => void;
  loadFavorites: () => void;
}

export const useCarStore = create<CarState>((set, get) => ({
  cars: [],
  favorites: [],
  filters: {},
  loading: false,
  totalPages: 0,
  currentPage: 1,
  hasMore: false,

  fetchCars: async (filters = {}, page = 1, reset = true) => {
    if (reset) {
      set({ loading: true, cars: [] });
    } else {
      set({ loading: true });
    }

    try {
      const response = await carApi.getCars({
        brand: filters.brand,
        rentalPrice: filters.price,
        minMileage: filters.mileageFrom,
        maxMileage: filters.mileageTo,
        page,
      });

      const currentPageNum = Number(response.page);
      const totalPagesNum = Number(response.totalPages);

      set({
        cars: reset ? response.cars : [...get().cars, ...response.cars],
        totalPages: totalPagesNum,
        currentPage: currentPageNum,
        hasMore: currentPageNum < totalPagesNum,
        filters,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to fetch cars:", err);
      set({ loading: false, hasMore: false });
    }
  },

  loadMoreCars: async () => {
    const { filters, currentPage, hasMore, loading, cars } = get();

    if (!hasMore || loading) return;

    set({ loading: true });

    try {
      const nextPage = currentPage + 1;

      const response = await carApi.getCars({
        brand: filters.brand,
        rentalPrice: filters.price,
        minMileage: filters.mileageFrom,
        maxMileage: filters.mileageTo,
        page: nextPage,
      });

      const pageNum = Number(response.page);
      const totalPagesNum = Number(response.totalPages);

      const existingCarIds = new Set(cars.map((car) => car.id));
      const newCars = response.cars.filter(
        (car) => !existingCarIds.has(car.id)
      );

      set({
        cars: [...cars, ...newCars],
        currentPage: pageNum,
        totalPages: totalPagesNum,
        hasMore: pageNum < totalPagesNum,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to load more cars:", err);
      set({ loading: false });
    }
  },

  setFilters: (filters: Filters) => set({ filters }),

  resetSearch: () => set({ cars: [], currentPage: 1, hasMore: true }),

  addToFavorites: (carId) => {
    set((state) => {
      const updated = [...state.favorites, carId];
      localStorage.setItem("car-favorites", JSON.stringify(updated));
      return { favorites: updated };
    });
  },

  removeFromFavorites: (carId) => {
    set((state) => {
      const updated = state.favorites.filter((id) => id !== carId);
      localStorage.setItem("car-favorites", JSON.stringify(updated));
      return { favorites: updated };
    });
  },

  loadFavorites: () => {
    try {
      const saved = localStorage.getItem("car-favorites");
      if (saved) set({ favorites: JSON.parse(saved) });
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  },
}));
