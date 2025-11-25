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

  // Actions
  fetchCars: (filters?: Filters, page?: number) => Promise<void>;
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
  hasMore: true,

  fetchCars: async (filters = {}, page = 1) => {
    set({ loading: true });
    try {
      const response = await carApi.getCars({
        make: filters.brand,
        rentalPrice: filters.price,
        mileageFrom: filters.mileageFrom,
        mileageTo: filters.mileageTo,
        page,
      });

      const hasMorePages = response.page < response.totalPages;

      set({
        cars: page === 1 ? response.cars : [...get().cars, ...response.cars],
        totalPages: response.totalPages,
        currentPage: response.page,
        hasMore: hasMorePages,
        filters: page === 1 ? filters : get().filters,
      });
    } catch (error) {
      console.error("Error fetching cars:", error);
      set({ hasMore: false });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreCars: async () => {
    const { filters, currentPage, hasMore, loading } = get();

    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      set({ loading: true });

      try {
        const response = await carApi.getCars({
          make: filters.brand,
          rentalPrice: filters.price,
          mileageFrom: filters.mileageFrom,
          mileageTo: filters.mileageTo,
          page: nextPage,
        });

        const hasMorePages = response.page < response.totalPages;

        set((state) => ({
          cars: [...state.cars, ...response.cars],
          currentPage: response.page,
          hasMore: hasMorePages,
          loading: false,
        }));
      } catch (error) {
        console.error("Error loading more cars:", error);
        set({ loading: false, hasMore: false });
      }
    }
  },

  setFilters: (filters: Filters) => {
    set({ filters });
  },

  resetSearch: () => {
    set({ cars: [], currentPage: 1, hasMore: true });
  },

  addToFavorites: (carId: string) => {
    set((state) => {
      const favorites = [...state.favorites, carId];
      if (typeof window !== "undefined") {
        localStorage.setItem("car-favorites", JSON.stringify(favorites));
      }
      return { favorites };
    });
  },

  removeFromFavorites: (carId: string) => {
    set((state) => {
      const favorites = state.favorites.filter((id) => id !== carId);
      if (typeof window !== "undefined") {
        localStorage.setItem("car-favorites", JSON.stringify(favorites));
      }
      return { favorites };
    });
  },

  loadFavorites: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("car-favorites");
      if (saved) {
        set({ favorites: JSON.parse(saved) });
      }
    }
  },
}));
