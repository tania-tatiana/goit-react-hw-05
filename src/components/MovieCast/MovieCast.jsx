import { useEffect, useState } from "react";
import styles from "./MovieCast.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
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
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      )
      .then((res) => {
        setActors(res.data.cast);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);
  return (
    <div className={styles.container}>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      {isError && <p className={styles.error}>Error loading reviews</p>}
      {!isLoading && actors.length === 0 && (
        <p className={styles.noActors}>No actors found.</p>
      )}
      <ul className={styles.castList}>
        {actors.length > 0 &&
          actors.map((actor) => (
            <li key={actor.cast_id} className={styles.castItem}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.original_name}
                />
              ) : (
                <div className={styles.placeholder}>No image available</div>
              )}
              <p className={styles.text}>{actor.original_name}</p>
              <p className={styles.text}>Character: {actor.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
