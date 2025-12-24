import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GameFilters, Platform, Genre } from "../../types/game";

const initialState: GameFilters = {
  platform: "Все",
  genre: "Все",
  dateRange: "Все даты",
  rating: "Рейтинг",
  searchQuery: "",
  category: "Популярные",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPlatform: (state, action: PayloadAction<Platform | "Все">) => {
      state.platform = action.payload;
    },
    setGenre: (state, action: PayloadAction<Genre | "Все">) => {
      state.genre = action.payload;
    },
    setDateRange: (state, action: PayloadAction<string>) => {
      state.dateRange = action.payload;
    },
    setRating: (state, action: PayloadAction<string>) => {
      state.rating = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (
      state,
      action: PayloadAction<"Популярные" | "Календарь" | "Серия">
    ) => {
      state.category = action.payload;
    },
    clearFilters: (state) => {
      state.platform = "Все";
      state.genre = "Все";
      state.dateRange = "Все даты";
      state.rating = "Рейтинг";
      state.searchQuery = "";
    },
  },
});

export const {
  setPlatform,
  setGenre,
  setDateRange,
  setRating,
  setSearchQuery,
  setCategory,
  clearFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
