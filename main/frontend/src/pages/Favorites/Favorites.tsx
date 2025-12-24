import { useAppSelector } from "../../store/hooks";
import { selectAllGames } from "../../store/selectors";
import { GameCard } from "../../components/GameCard/GameCard";
import styles from "./Favorites.module.css";

export const Favorites = () => {
  const allGames = useAppSelector(selectAllGames);
  const favorites = useAppSelector((state) => state.games.favorites);
  const favoriteGames = allGames.filter((game) => favorites.includes(game.id));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Избранное</h1>
      {favoriteGames.length > 0 ? (
        <div className={styles.gamesGrid}>
          {favoriteGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>У вас пока нет избранных игр</p>
      )}
    </div>
  );
};
