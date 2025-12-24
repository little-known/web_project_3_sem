import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./slices/gamesSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
