import { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviePage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const [debouncedQuery] = useDebounce(query, 300);

  //   const url =
  //     "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDBjNWIwOGMyY2Q3ODUzZDhkNDVkZWU1NzYxZWE4MSIsIm5iZiI6MTc0NzkzMjQyMC45OTIsInN1YiI6IjY4MmY1NTA0ZGQyNTE2ZGI4YTYzZjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RXM5c3bq-xJlhEjA5PENvUwL9fhk1SwiGaCUCCK14Uc",
    },
  };

  useEffect(() => {
    if (!debouncedQuery) return;

    setIsLoading(true);
    setIsError(null);

    axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          query: debouncedQuery,
          language: "en-US",
        },
        ...options,
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((err) => {
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    const nextSearchParams = new URLSearchParams(searchParams);
    if (value !== "") {
      nextSearchParams.set("query", value);
    } else {
      nextSearchParams.delete("query");
    }

    setSearchParams(nextSearchParams);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="search"
          placeholder="Search movies..."
          defaultValue={query}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading movies</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
