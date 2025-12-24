import type { Game } from "../types/game";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export interface CreateGameDto {
  title: string;
  coverImage: string;
  screenshots: string[];
  description: string;
  platforms: string[];
  genres: string[];
  rating: number;
  releaseDate: string;
}

export type UpdateGameDto = Partial<CreateGameDto>;

export const gamesApi = {
  async getAll(): Promise<Game[]> {
    const response = await fetch(`${API_BASE_URL}/games`);
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    return response.json();
  },

  async getById(id: string): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch game");
    }
    return response.json();
  },

  async create(game: CreateGameDto): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    if (!response.ok) {
      throw new Error("Failed to create game");
    }
    return response.json();
  },

  async update(id: string, game: UpdateGameDto): Promise<Game> {
    const response = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(game),
    });
    if (!response.ok) {
      throw new Error("Failed to update game");
    }
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete game");
    }
  },
};
