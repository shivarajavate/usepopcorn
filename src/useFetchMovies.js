import { useEffect, useState } from "react";

const KEY = "f84fc31d";

export function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!response.ok) {
          throw new Error(`Something went wrong while fetching movies`);
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(`No movies found for ${query}`);
        }

        setMovies(data.Search);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setErrorMessage("");
      return;
    }
    fetchMovies();
  }, [query]);

  return { movies, isLoading, errorMessage };
}
