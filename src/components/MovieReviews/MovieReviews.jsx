import { useEffect, useState } from "react";
import styles from "./MovieReviews.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
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
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
        options
      )
      .then((res) => {
        setReviews(res.data.results);
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
      {!isLoading && reviews.length === 0 && (
        <p className={styles.noReviews}>No reviews found.</p>
      )}

      <ul className={styles.reviewList}>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewAuthor}>Author: {review.author}</p>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
