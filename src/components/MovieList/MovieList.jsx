import styles from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {movies.length > 0 && (
        <ul className={styles.list}>
          {movies.map((movie) => (
            <li key={movie.id} className={styles.item}>
              <Link
                to={`/movies/${movie.id}`}
                state={location}
                className={styles.link}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
