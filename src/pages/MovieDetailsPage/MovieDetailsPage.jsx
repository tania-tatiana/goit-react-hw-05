import {
  Link,
  NavLink,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLink = useRef(location.state);
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDBjNWIwOGMyY2Q3ODUzZDhkNDVkZWU1NzYxZWE4MSIsIm5iZiI6MTc0NzkzMjQyMC45OTIsInN1YiI6IjY4MmY1NTA0ZGQyNTE2ZGI4YTYzZjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RXM5c3bq-xJlhEjA5PENvUwL9fhk1SwiGaCUCCK14Uc",
    },
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      )
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {isError && <p className={styles.error}>Error loading movies</p>}
      <Link
        to={backLink !== null ? backLink.current : navigate("/movies")}
        className={styles.backLink}
      >
        Go back
      </Link>
      {movie && (
        <li key={movie.id} className={styles.movieCard}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.original_title}
            className={styles.movieImage}
          />
          <h1 className={styles.title}>{movie.original_title}</h1>
          <p className={styles.userScore}>
            User Score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p>{movie.overview}</p>
          <h3 className={styles.sectionTitle}>Genres</h3>
          <ul className={styles.genresList}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </li>
      )}
      <p className={styles.additionalInfo}>Additional information</p>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
