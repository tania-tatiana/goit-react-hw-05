import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const activeLink = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

export default function Navigation() {
  return (
    <div className={styles.wrapper}>
      <NavLink to="/" className={activeLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={activeLink}>
        Movies
      </NavLink>
    </div>
  );
}
