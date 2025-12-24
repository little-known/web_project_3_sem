import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Game } from "../../types/game";
import { gamesApi } from "../../api/gamesApi";

interface GamesState {
  games: Game[];
  favorites: string[];
  loading: boolean;
  error: string | null;
}

const initialState: GamesState = {
  games: [],
  favorites: [],
  loading: false,
  error: null,
};

export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async (_, { rejectWithValue }) => {
    try {
      return await gamesApi.getAll();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch games"
      );
    }
  }
);

export const fetchGameById = createAsyncThunk(
  "games/fetchGameById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await gamesApi.getById(id);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch game"
      );
    }
  }
);

export const createGame = createAsyncThunk(
  "games/createGame",
  async (game: Parameters<typeof gamesApi.create>[0], { rejectWithValue }) => {
    try {
      return await gamesApi.create(game);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to create game"
      );
    }
  }
);

export const updateGame = createAsyncThunk(
  "games/updateGame",
  async (
    { id, game }: { id: string; game: Parameters<typeof gamesApi.update>[1] },
    { rejectWithValue }
  ) => {
    try {
      return await gamesApi.update(id, game);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to update game"
      );
    }
  }
);

export const deleteGame = createAsyncThunk(
  "games/deleteGame",
  async (id: string, { rejectWithValue }) => {
    try {
      await gamesApi.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to delete game"
      );
    }
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const gameId = action.payload;
      const index = state.favorites.indexOf(gameId);
      if (index === -1) {
        state.favorites.push(gameId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
        state.error = null;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        const game = action.payload;
        const existingIndex = state.games.findIndex((g) => g.id === game.id);
        if (existingIndex >= 0) {
          state.games[existingIndex] = game;
        } else {
          state.games.push(game);
        }
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.games.push(action.payload);
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        const index = state.games.findIndex((g) => g.id === action.payload.id);
        if (index >= 0) {
          state.games[index] = action.payload;
        }
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = state.games.filter((g) => g.id !== action.payload);
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      });
  },
});

export const { toggleFavorite } = gamesSlice.actions;
export default gamesSlice.reducer;
