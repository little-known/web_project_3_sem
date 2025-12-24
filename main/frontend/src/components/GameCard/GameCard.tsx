import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../store/slices/gamesSlice";
import type { Game } from "../../types/game";
import styles from "./GameCard.module.css";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.games.favorites);
  const isFavorite = favorites.includes(game.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(game.id));
  };

  const handleCardClick = () => {
    navigate(`/game/${game.id}`);
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      data-testid="game-card"
    >
      <div className={styles.imageContainer}>
        <img src={game.coverImage} alt={game.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{game.title}</h3>
          <button
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
            aria-label="Добавить в избранное"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFavorite ? "#ec4899" : "none"}
              stroke={isFavorite ? "#ec4899" : "#9ca3af"}
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <div>
          <p className={styles.platforms}>{game.platforms.join(", ")}</p>
          <p className={styles.genres}>{game.genres.join(", ")}</p>
          <p className={styles.releaseDate}>Вышла: {game.releaseDate}</p>
        </div>
      </div>
    </div>
  );
};
