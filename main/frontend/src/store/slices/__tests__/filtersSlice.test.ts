import filtersReducer, {
  setPlatform,
  setGenre,
  setDateRange,
  setRating,
  setSearchQuery,
  setCategory,
  clearFilters,
} from "../filtersSlice";

import type { GameFilters } from "../../../types/game";

describe("filtersSlice", () => {
  const initialState: GameFilters = {
    platform: "Все",
    genre: "Все",
    dateRange: "Все даты",
    rating: "Рейтинг",
    searchQuery: "",
    category: "Популярные",
  };

  describe("setPlatform", () => {
    it("should update platform filter", () => {
      const action = setPlatform("PC");
      const newState = filtersReducer(initialState, action);

      expect(newState.platform).toBe("PC");
    });
  });

  describe("setGenre", () => {
    it("should update genre filter", () => {
      const action = setGenre("Action");
      const newState = filtersReducer(initialState, action);

      expect(newState.genre).toBe("Action");
    });
  });

  describe("setDateRange", () => {
    it("should update date range filter", () => {
      const action = setDateRange("2025");
      const newState = filtersReducer(initialState, action);

      expect(newState.dateRange).toBe("2025");
    });
  });

  describe("setRating", () => {
    it("should update rating filter", () => {
      const action = setRating("9.0+");
      const newState = filtersReducer(initialState, action);

      expect(newState.rating).toBe("9.0+");
    });
  });

  describe("setSearchQuery", () => {
    it("should update search query", () => {
      const action = setSearchQuery("test query");
      const newState = filtersReducer(initialState, action);

      expect(newState.searchQuery).toBe("test query");
    });
  });

  describe("setCategory", () => {
    it("should update category", () => {
      const action = setCategory("Календарь");
      const newState = filtersReducer(initialState, action);

      expect(newState.category).toBe("Календарь");
    });
  });

  describe("clearFilters", () => {
    it("should reset all filters to initial values", () => {
      const state: GameFilters = {
        platform: "PC",
        genre: "Action",
        dateRange: "2025",
        rating: "9.0+",
        searchQuery: "test",
        category: "Календарь",
      };
      const action = clearFilters();
      const newState = filtersReducer(state, action);

      expect(newState.platform).toBe("Все");
      expect(newState.genre).toBe("Все");
      expect(newState.dateRange).toBe("Все даты");
      expect(newState.rating).toBe("Рейтинг");
      expect(newState.searchQuery).toBe("");
    });
  });
});
