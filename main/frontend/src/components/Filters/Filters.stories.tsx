import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Filters } from "./Filters";
import gamesReducer from "../../store/slices/gamesSlice";
import filtersReducer from "../../store/slices/filtersSlice";

const meta: Meta<typeof Filters> = {
  title: "Components/Filters",
  component: Filters,
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: {
          games: gamesReducer,
          filters: filtersReducer,
        },
      });
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </Provider>
      );
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Filters>;

export const Default: Story = {};

export const WithFilters: Story = {
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: {
          games: gamesReducer,
          filters: filtersReducer,
        },
        preloadedState: {
          games: {
            games: [],
            favorites: [],
            loading: false,
            error: null,
          },
          filters: {
            platform: "PC" as const,
            genre: "Action" as const,
            dateRange: "2025",
            rating: "9.0+",
            searchQuery: "",
            category: "Популярные" as const,
          },
        },
      });
      return (
        <Provider store={store}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </Provider>
      );
    },
  ],
};
