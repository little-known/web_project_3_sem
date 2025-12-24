import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearchQuery } from "../../store/slices/filtersSlice";
import styles from "./Search.module.css";

export const Search = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
    </div>
  );
};
