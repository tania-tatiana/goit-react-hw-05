import { useEffect, useState } from "react";
import styles from "./MovieList.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function MovieList() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

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
      .get(url, options)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {isError && <p className={styles.error}>Error loading movies</p>}

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
