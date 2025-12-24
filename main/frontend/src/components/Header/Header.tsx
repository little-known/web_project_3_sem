import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Каталог игр
      </Link>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
        >
          Главная
        </Link>
        <Link
          to="/favorites"
          className={`${styles.navLink} ${location.pathname === '/favorites' ? styles.active : ''}`}
        >
          Избранное
        </Link>
      </nav>
    </header>
  );
};

