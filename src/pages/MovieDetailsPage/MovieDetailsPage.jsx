import { Link, NavLink, useParams, Outlet } from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieDetailsPage() {
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
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading movies</p>}

      <Link>Go back</Link>

      {movie && (
        <li key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.original_title}
          />
          <h1>{movie.original_title}</h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </li>
      )}
      <p>Additional information</p>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
