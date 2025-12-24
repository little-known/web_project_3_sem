import type { RootState } from "../store";
import {
  selectAllGames,
  selectFavorites,
  selectFilters,
  selectFilteredGames,
  selectGameById,
} from "../selectors";
import type { Game } from "../../types/game";

const mockGames: Game[] = [
  {
    id: "1",
    title: "Game 1",
    coverImage: "https://example.com/cover1.jpg",
    screenshots: ["https://example.com/screenshot1.jpg"],
    description: "Description 1",
    platforms: ["PC", "PS"],
    genres: ["Action", "RPG"],
    rating: 9.5,
    releaseDate: "2025-01-01",
  },
  {
    id: "2",
    title: "Game 2",
    coverImage: "https://example.com/cover2.jpg",
    screenshots: ["https://example.com/screenshot2.jpg"],
    description: "Description 2",
    platforms: ["Xbox"],
    genres: ["Strategy"],
    rating: 8.0,
    releaseDate: "2025-02-01",
  },
  {
    id: "3",
    title: "Another Game",
    coverImage: "https://example.com/cover3.jpg",
    screenshots: ["https://example.com/screenshot3.jpg"],
    description: "Description 3",
    platforms: ["PC"],
    genres: ["Action"],
    rating: 7.5,
    releaseDate: "2025-03-01",
  },
];

const mockState: RootState = {
  games: {
    games: mockGames,
    favorites: ["1"],
    loading: false,
    error: null,
  },
  filters: {
    platform: "Все",
    genre: "Все",
    dateRange: "Все даты",
    rating: "Рейтинг",
    searchQuery: "",
    category: "Популярные" as const,
  },
};

describe("selectors", () => {
  describe("selectAllGames", () => {
    it("should return all games", () => {
      const result = selectAllGames(mockState);
      expect(result).toEqual(mockGames);
    });
  });

  describe("selectFavorites", () => {
    it("should return favorites array", () => {
      const result = selectFavorites(mockState);
      expect(result).toEqual(["1"]);
    });
  });

  describe("selectFilters", () => {
    it("should return filters state", () => {
      const result = selectFilters(mockState);
      expect(result).toEqual(mockState.filters);
    });
  });

  describe("selectFilteredGames", () => {
    it("should return all games when no filters applied", () => {
      const result = selectFilteredGames(mockState);
      expect(result).toHaveLength(3);
      expect(result[0].rating).toBe(9.5);
    });

    it("should filter by search query", () => {
      const state = {
        ...mockState,
        filters: { ...mockState.filters, searchQuery: "Another" },
      };
      const result = selectFilteredGames(state);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Another Game");
    });

    it("should filter by platform", () => {
      const state: RootState = {
        ...mockState,
        filters: { ...mockState.filters, platform: "PC" as const },
      };
      const result = selectFilteredGames(state);
      expect(result).toHaveLength(2);
      expect(result.every((game) => game.platforms.includes("PC"))).toBe(true);
    });

    it("should filter by genre", () => {
      const state: RootState = {
        ...mockState,
        filters: { ...mockState.filters, genre: "Action" as const },
      };
      const result = selectFilteredGames(state);
      expect(result).toHaveLength(2);
      expect(result.every((game) => game.genres.includes("Action"))).toBe(true);
    });

    it("should filter by rating", () => {
      const state = {
        ...mockState,
        filters: { ...mockState.filters, rating: "9.0+" },
      };
      const result = selectFilteredGames(state);
      expect(result).toHaveLength(1);
      expect(result[0].rating).toBeGreaterThanOrEqual(9.0);
    });

    it("should apply multiple filters", () => {
      const state: RootState = {
        ...mockState,
        filters: {
          ...mockState.filters,
          platform: "PC" as const,
          genre: "Action" as const,
          rating: "8.0+",
        },
      };
      const result = selectFilteredGames(state);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    it("should sort by rating when category is Популярные", () => {
      const result = selectFilteredGames(mockState);
      expect(result[0].rating).toBeGreaterThanOrEqual(result[1].rating);
      expect(result[1].rating).toBeGreaterThanOrEqual(result[2].rating);
    });
  });

  describe("selectGameById", () => {
    it("should return game by id", () => {
      const result = selectGameById(mockState, "1");
      expect(result).toEqual(mockGames[0]);
    });

    it("should return undefined for non-existent id", () => {
      const result = selectGameById(mockState, "999");
      expect(result).toBeUndefined();
    });
  });
});
