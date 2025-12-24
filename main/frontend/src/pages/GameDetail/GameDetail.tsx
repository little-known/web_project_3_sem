import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGameById } from "../../store/selectors";
import { fetchGameById } from "../../store/slices/gamesSlice";
import { ScreenshotSlider } from "../../components/ScreenshotSlider/ScreenshotSlider";
import styles from "./GameDetail.module.css";

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) =>
    id ? selectGameById(state, id) : undefined
  );
  const loading = useAppSelector((state) => state.games.loading);
  const error = useAppSelector((state) => state.games.error);

  useEffect(() => {
    if (id && !game) {
      dispatch(fetchGameById(id));
    }
  }, [id, game, dispatch]);

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.loading}>Загрузка...</p>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error || "Игра не найдена"}</p>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.coverContainer}>
              <img
                src={game.coverImage}
                alt={game.title}
                className={styles.cover}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <h1 className={styles.title}>{game.title}</h1>
            <div className={styles.tags}>
              {game.genres.map((genre) => (
                <span key={genre} className={styles.tag}>
                  {genre}
                </span>
              ))}
              {game.platforms.map((platform) => (
                <span key={platform} className={styles.tag}>
                  {platform}
                </span>
              ))}
            </div>
            <div className={styles.description}>{game.description}</div>
            <div className={styles.meta}>
              <div className={styles.rating}>
                {typeof game.rating === "number"
                  ? game.rating.toFixed(1)
                  : game.rating}
              </div>
              <div className={styles.releaseDate}>
                Вышла: {game.releaseDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sliderWrapper}>
        <ScreenshotSlider screenshots={game.screenshots} />
      </div>
    </>
  );
};
