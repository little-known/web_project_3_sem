import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCategory } from "../../store/slices/filtersSlice";
import { Search } from "../../components/Search/Search";
import styles from "./Navigation.module.css";

const categories: ("Популярные" | "Календарь" | "Серия")[] = [
  "Популярные",
  "Календарь",
  "Серия",
];

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector((state) => state.filters.category);

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationBtns}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.navButton} ${
              currentCategory === category ? styles.active : ""
            }`}
            onClick={() => dispatch(setCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>
      <Search />
    </div>
  );
};
