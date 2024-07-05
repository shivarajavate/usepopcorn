import React, { useRef, useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
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
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox query={query} setQuery={setQuery} />
        <MovieResultsSummary movies={movies} />
      </NavBar>
      <MovieDetailsSection>
        <MovieListBox>
          {isLoading && <Loader />}
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {!isLoading && !errorMessage && <MovieList movies={movies} />}
        </MovieListBox>
        <MovieListBox>
          <WatchedMovieListSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </MovieListBox>
      </MovieDetailsSection>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img" aria-label="popcorn">
        🍿
      </span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function SearchBox({ query, setQuery }) {
  const inputElement = useRef(null);
  useEffect(() => {
    function handleKeydown(e) {
      if (document.activeElement === inputElement.current) {
        return;
      }
      if (e.code === "Enter") {
        inputElement.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [setQuery]);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function MovieResultsSummary({ movies }) {
  const noOfMovies = movies.length;
  return (
    <p className="num-results">
      Found <strong>{noOfMovies}</strong> results
    </p>
  );
}

function MovieDetailsSection({ children }) {
  return <main className="main">{children}</main>;
}

function MovieListBox({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Loader() {
  return <div className="loader">Loading...</div>;
}

function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span role="img" aria-label="error">
        ⛔️
      </span>
      {message}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedMovieListSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span role="img" aria-label="hash">
            #️⃣
          </span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span role="img" aria-label="star">
            ⭐️
          </span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span role="img" aria-label="star">
            🌟
          </span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span role="img" aria-label="time">
            ⏳
          </span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span role="img" aria-label="star">
            ⭐️
          </span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span role="img" aria-label="star">
            🌟
          </span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span role="img" aria-label="time">
            ⏳
          </span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
