import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectFilteredGames } from "../../store/selectors";
import { fetchGames } from "../../store/slices/gamesSlice";
import { GameCard } from "../../components/GameCard/GameCard";
import { Navigation } from "../../components/Navigation/Navigation";
import { Filters } from "../../components/Filters/Filters";

import styles from "./Home.module.css";

export const Home = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectFilteredGames);
  const loading = useAppSelector((state) => state.games.loading);
  const error = useAppSelector((state) => state.games.error);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Лучшие игры 2025 года</h1>
      <Navigation />
      <Filters />
      {loading && <p className={styles.loading}>Загрузка...</p>}
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      {!loading && !error && (
        <div className={styles.gamesGrid}>
          {games.length > 0 ? (
            games.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <p className={styles.noGames}>Игры не найдены</p>
          )}
        </div>
      )}
    </div>
  );
};
