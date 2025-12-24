import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { GameCard } from "./GameCard";
import gamesReducer from "../../store/slices/gamesSlice";
import filtersReducer from "../../store/slices/filtersSlice";
import type { Game } from "../../types/game";

const meta: Meta<typeof GameCard> = {
  title: "Components/GameCard",
  component: GameCard,
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
type Story = StoryObj<typeof GameCard>;

const mockGame: Game = {
  id: "1",
  title: "Hollow Knight: Silksong",
  coverImage:
    "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Hollow+Knight",
  screenshots: [
    "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
  ],
  description: "Главная героиня — Хорнет — принцесса-защитница Халлоунеста.",
  platforms: ["PC", "PS", "Xbox"],
  genres: ["Метроидвание", "Платформер"],
  rating: 9.7,
  releaseDate: "xx.xx.2025",
};

export const Default: Story = {
  args: {
    game: mockGame,
  },
};

export const Favorite: Story = {
  args: {
    game: mockGame,
  },
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
            favorites: [mockGame.id],
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

export const SinglePlatform: Story = {
  args: {
    game: {
      ...mockGame,
      platforms: ["PC"],
    },
  },
};

export const LongTitle: Story = {
  args: {
    game: {
      ...mockGame,
      title:
        "Очень длинное название игры которое может не поместиться в одну строку",
    },
  },
};
