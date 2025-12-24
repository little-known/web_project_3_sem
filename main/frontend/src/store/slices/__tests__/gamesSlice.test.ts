import gamesReducer, {
  toggleFavorite,
  fetchGames,
  fetchGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../gamesSlice";
import type { Game } from "../../../types/game";

jest.mock("../../../api/gamesApi", () => ({
  gamesApi: {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockGame: Game = {
  id: "1",
  title: "Test Game",
  coverImage: "https://example.com/cover.jpg",
  screenshots: ["https://example.com/screenshot1.jpg"],
  description: "Test description",
  platforms: ["PC"],
  genres: ["Action"],
  rating: 8.5,
  releaseDate: "2025-01-01",
};

describe("gamesSlice", () => {
  const initialState = {
    games: [],
    favorites: [],
    loading: false,
    error: null,
  };

  describe("toggleFavorite", () => {
    it("should add game to favorites when not in favorites", () => {
      const state = { ...initialState };
      const action = toggleFavorite("1");
      const newState = gamesReducer(state, action);

      expect(newState.favorites).toContain("1");
    });

    it("should remove game from favorites when already in favorites", () => {
      const state = { ...initialState, favorites: ["1"] };
      const action = toggleFavorite("1");
      const newState = gamesReducer(state, action);

      expect(newState.favorites).not.toContain("1");
    });
  });

  describe("fetchGames", () => {
    it("should handle pending state", () => {
      const action = { type: fetchGames.pending.type };
      const newState = gamesReducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
    });

    it("should handle fulfilled state", () => {
      const games = [mockGame];
      const action = { type: fetchGames.fulfilled.type, payload: games };
      const newState = gamesReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.games).toEqual(games);
      expect(newState.error).toBeNull();
    });

    it("should handle rejected state", () => {
      const error = "Failed to fetch games";
      const action = {
        type: fetchGames.rejected.type,
        payload: error,
      };
      const newState = gamesReducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(error);
    });
  });

  describe("fetchGameById", () => {
    it("should add game to games array when fulfilled", () => {
      const action = {
        type: fetchGameById.fulfilled.type,
        payload: mockGame,
      };
      const newState = gamesReducer(initialState, action);

      expect(newState.games).toContainEqual(mockGame);
    });

    it("should update existing game when fulfilled", () => {
      const existingGame = { ...mockGame, title: "Old Title" };
      const state = { ...initialState, games: [existingGame] };
      const updatedGame = { ...mockGame, title: "New Title" };
      const action = {
        type: fetchGameById.fulfilled.type,
        payload: updatedGame,
      };
      const newState = gamesReducer(state, action);

      expect(newState.games[0].title).toBe("New Title");
    });
  });

  describe("createGame", () => {
    it("should add new game to games array", () => {
      const action = {
        type: createGame.fulfilled.type,
        payload: mockGame,
      };
      const newState = gamesReducer(initialState, action);

      expect(newState.games).toContainEqual(mockGame);
    });
  });

  describe("updateGame", () => {
    it("should update existing game", () => {
      const state = { ...initialState, games: [mockGame] };
      const updatedGame = { ...mockGame, rating: 9.0 };
      const action = {
        type: updateGame.fulfilled.type,
        payload: updatedGame,
      };
      const newState = gamesReducer(state, action);

      expect(newState.games[0].rating).toBe(9.0);
    });
  });

  describe("deleteGame", () => {
    it("should remove game from games array", () => {
      const state = { ...initialState, games: [mockGame] };
      const action = {
        type: deleteGame.fulfilled.type,
        payload: "1",
      };
      const newState = gamesReducer(state, action);

      expect(newState.games).not.toContainEqual(mockGame);
    });

    it("should remove game from favorites when deleted", () => {
      const state = {
        ...initialState,
        games: [mockGame],
        favorites: ["1"],
      };
      const action = {
        type: deleteGame.fulfilled.type,
        payload: "1",
      };
      const newState = gamesReducer(state, action);

      expect(newState.favorites).not.toContain("1");
    });
  });
});
