import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.navList}>
        <li className={styles.item}>
          <NavLink
            exact
            to="/"
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
