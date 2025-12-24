import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Navigation } from "./Navigation";
import gamesReducer from "../../store/slices/gamesSlice";
import filtersReducer from "../../store/slices/filtersSlice";

const meta: Meta<typeof Navigation> = {
  title: "Components/Navigation",
  component: Navigation,
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
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};

export const ActivePopular: Story = {
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
            platform: "Все" as const,
            genre: "Все" as const,
            dateRange: "Все даты",
            rating: "Рейтинг",
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

export const ActiveCalendar: Story = {
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
            platform: "Все" as const,
            genre: "Все" as const,
            dateRange: "Все даты",
            rating: "Рейтинг",
            searchQuery: "",
            category: "Календарь" as const,
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
