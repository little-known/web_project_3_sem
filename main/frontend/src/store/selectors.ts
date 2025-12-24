import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Game, Platform, Genre } from "../types/game";

export const selectAllGames = (state: RootState) => state.games.games;
export const selectFavorites = (state: RootState) => state.games.favorites;
export const selectFilters = (state: RootState) => state.filters;

export const selectFilteredGames = createSelector(
  [selectAllGames, selectFilters],
  (games, filters) => {
    let filtered = [...games];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(query)
      );
    }

    if (filters.platform !== "Все") {
      filtered = filtered.filter((game) =>
        game.platforms.includes(filters.platform as Platform)
      );
    }

    if (filters.genre !== "Все") {
      filtered = filtered.filter((game) =>
        game.genres.includes(filters.genre as Genre)
      );
    }

    if (filters.rating !== "Рейтинг") {
      const ratingValue = parseFloat(filters.rating);
      filtered = filtered.filter((game) => game.rating >= ratingValue);
    }

    if (filters.category === "Популярные") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }
);

export const selectGameById = (
  state: RootState,
  gameId: string
): Game | undefined => {
  return state.games.games.find((game) => game.id === gameId);
};
