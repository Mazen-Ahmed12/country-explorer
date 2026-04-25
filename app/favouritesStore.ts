import { create } from "zustand";
import { Country } from "./country";

interface FavouritesStore {
  favourites: Country[];
  addFavourite: (country: Country) => void;
  removeFavourite: (cca3: string) => void;
  // Return a selector function for checking if a specific country is favourite
  isFavourite: (cca3: string) => boolean;
}

export const useFavouritesStore = create<FavouritesStore>((set, get) => ({
  favourites: [],
  addFavourite: (country) =>
    set((state) => ({ favourites: [...state.favourites, country] })),
  removeFavourite: (cca3) =>
    set((state) => ({
      favourites: state.favourites.filter((country) => country.cca3 !== cca3),
    })),
  isFavourite: (cca3) => get().favourites.some((c) => c.cca3 === cca3),
}));

// Custom hook for checking if a specific country is favourite
export const useIsFavourite = (cca3: string) => {
  return useFavouritesStore(state => state.favourites.some(country => country.cca3 === cca3));
};