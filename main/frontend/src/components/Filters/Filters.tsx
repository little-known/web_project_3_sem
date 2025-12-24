import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setPlatform,
  setGenre,
  setDateRange,
  setRating,
  clearFilters,
} from "../../store/slices/filtersSlice";
import type { Platform, Genre } from "../../types/game";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import styles from "./Filters.module.css";

const platforms: (Platform | "Все")[] = ["Все", "PC", "PS", "Xbox"];
const genres: (Genre | "Все")[] = [
  "Все",
  "Метроидвание",
  "Платформер",
  "Action",
  "RPG",
  "Strategy",
];
const dateRanges = ["Все даты", "2025", "2024", "2023"];
const ratings = ["Рейтинг", "9.0+", "8.0+", "7.0+", "6.0+"];

export const Filters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters);

  const platformOptions = [
    { value: "Все", label: "Платформа" },
    ...platforms
      .filter((p) => p !== "Все")
      .map((platform) => ({ value: platform, label: platform })),
  ];

  const genreOptions = genres.map((genre) => ({
    value: genre,
    label: genre === "Все" ? "Все" : genre,
  }));

  const dateOptions = dateRanges.map((date) => ({
    value: date,
    label: date,
  }));

  const ratingOptions = ratings.map((rating) => ({
    value: rating,
    label: rating,
  }));

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersRow}>
        <CustomSelect
          value={filters.platform}
          options={platformOptions}
          onChange={(value) => dispatch(setPlatform(value as Platform | "Все"))}
        />
        <CustomSelect
          value={filters.genre}
          options={genreOptions}
          onChange={(value) => dispatch(setGenre(value as Genre | "Все"))}
        />
        <CustomSelect
          value={filters.dateRange}
          options={dateOptions}
          onChange={(value) => dispatch(setDateRange(value))}
        />
        <CustomSelect
          value={filters.rating}
          options={ratingOptions}
          onChange={(value) => dispatch(setRating(value))}
        />
        <button
          className={styles.clearButton}
          onClick={() => dispatch(clearFilters())}
        >
          Очистить
        </button>
      </div>
    </div>
  );
};
