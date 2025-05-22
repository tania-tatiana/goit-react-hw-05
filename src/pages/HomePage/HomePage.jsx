import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  return (
    <div>
      <h1>Trending today</h1>
      <MovieList />
    </div>
  );
}
