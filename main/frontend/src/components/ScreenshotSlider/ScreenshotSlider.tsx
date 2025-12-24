import { useState, useEffect, useCallback } from "react";
import styles from "./ScreenshotSlider.module.css";

interface ScreenshotSliderProps {
  screenshots: string[];
}

export const ScreenshotSlider = ({ screenshots }: ScreenshotSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  }, [screenshots.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  }, [screenshots.length]);

  const handleImageClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleFullscreenPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePrevious();
  };

  const handleFullscreenNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleNext();
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseFullscreen();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isFullscreen, handleCloseFullscreen, handlePrevious, handleNext]);

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <>
      <div className={styles.slider}>
        <img
          src={screenshots[currentIndex]}
          alt={`Скриншот ${currentIndex + 1}`}
          className={styles.image}
          onClick={handleImageClick}
        />
        <button
          className={styles.navButton}
          onClick={handlePrevious}
          aria-label="Предыдущий скриншот"
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6.94645"
              y="13.8933"
              width="9.82376"
              height="1.96475"
              transform="rotate(-135 6.94645 13.8933)"
              fill="white"
            />
            <rect
              x="8.33585"
              y="1.38928"
              width="9.82376"
              height="1.96475"
              transform="rotate(135 8.33585 1.38928)"
              fill="white"
            />
          </svg>
        </button>
        <button
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Следующий скриншот"
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.3894"
              y="0.000130064"
              width="9.82376"
              height="1.96475"
              transform="rotate(45 1.3894 0.000130064)"
              fill="white"
            />
            <rect
              x="6.07296e-07"
              y="12.5042"
              width="9.82376"
              height="1.96475"
              transform="rotate(-45 6.07296e-07 12.5042)"
              fill="white"
            />
          </svg>
        </button>
      </div>

      {isFullscreen && (
        <div className={styles.fullscreen} onClick={handleCloseFullscreen}>
          <button
            className={styles.closeButton}
            onClick={handleCloseFullscreen}
            aria-label="Закрыть"
          >
            ×
          </button>
          <img
            src={screenshots[currentIndex]}
            alt={`Скриншот ${currentIndex + 1}`}
            className={styles.fullscreenImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className={styles.fullscreenNavButton}
            onClick={handleFullscreenPrevious}
            aria-label="Предыдущий скриншот"
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6.94645"
                y="13.8933"
                width="9.82376"
                height="1.96475"
                transform="rotate(-135 6.94645 13.8933)"
                fill="white"
              />
              <rect
                x="8.33585"
                y="1.38928"
                width="9.82376"
                height="1.96475"
                transform="rotate(135 8.33585 1.38928)"
                fill="white"
              />
            </svg>
          </button>
          <button
            className={styles.fullscreenNavButton}
            onClick={handleFullscreenNext}
            aria-label="Следующий скриншот"
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.3894"
                y="0.000130064"
                width="9.82376"
                height="1.96475"
                transform="rotate(45 1.3894 0.000130064)"
                fill="white"
              />
              <rect
                x="6.07296e-07"
                y="12.5042"
                width="9.82376"
                height="1.96475"
                transform="rotate(-45 6.07296e-07 12.5042)"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};
