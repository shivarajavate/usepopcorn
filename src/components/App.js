import React, { useEffect, useState } from "react";

import NavBar from "./NavBar";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import MovieResultsSummary from "./MovieResultsSummary";
import Main from "./Main";
import Box from "./Box";
import MovieList from "./MovieList";
import Loader from "./Loader";
import Error from "./Error";
import SelectedMovie from "./SelectedMovie";
import WatchedMovieListSummary from "./WatchedMovieListSummary";
import WatchedMovieList from "./WatchedMovieList";

import { useFetchMovies } from "../hooks/useFetchMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, isLoading, errorMessage } = useFetchMovies(query);
  const [watchedMovieList, setWatchedMovieList] =
    useLocalStorageState("watchedMovieList");

  useEffect(() => {
    handleRemoveSelectedMovieId();
  }, [query]);

  function handleAddWatchedMovie(newWatchedMovie) {
    const alreadyWatchedMovie = !!watchedMovieList.find(
      (watchedMovie) => watchedMovie.imdbID === newWatchedMovie.imdbID
    );
    if (alreadyWatchedMovie) return;
    setWatchedMovieList((watchedMovieList) => [
      ...watchedMovieList,
      newWatchedMovie,
    ]);
  }

  function handleSelectMovie(id) {
    setSelectedMovieId((selectedMovieId) =>
      selectedMovieId === id ? null : id
    );
  }

  function handleDeleteWatchedMovie(id) {
    setWatchedMovieList((watchedMovieList) =>
      watchedMovieList.filter((watchedMovie) => watchedMovie.imdbID !== id)
    );
  }

  function handleRemoveSelectedMovieId() {
    setSelectedMovieId(null);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox query={query} setQuery={setQuery} />
        <MovieResultsSummary movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {errorMessage && <Error message={errorMessage} />}
          {!isLoading && !errorMessage && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedMovieId ? (
            <SelectedMovie
              key={selectedMovieId}
              id={selectedMovieId}
              watchedMovieList={watchedMovieList}
              onAddWatchedMovie={handleAddWatchedMovie}
              onRemoveSelectedMovieId={handleRemoveSelectedMovieId}
            />
          ) : (
            <>
              <WatchedMovieListSummary watchedMovieList={watchedMovieList} />
              <WatchedMovieList
                watchedMovieList={watchedMovieList}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
