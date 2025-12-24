export type Platform = "PC" | "PS" | "Xbox";

export type Genre =
  | "Метроидвание"
  | "Платформер"
  | "Action"
  | "RPG"
  | "Strategy";

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  screenshots: string[];
  description: string;
  platforms: Platform[];
  genres: Genre[];
  rating: number;
  releaseDate: string;
  isFavorite?: boolean;
}

export interface GameFilters {
  platform: Platform | "Все";
  genre: Genre | "Все";
  dateRange: string;
  rating: string;
  searchQuery: string;
  category: "Популярные" | "Календарь" | "Серия";
}
