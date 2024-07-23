import React from "react";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({
  watchedMovieList,
  onDeleteWatchedMovie,
}) {
  return (
    <ul className="list">
      {watchedMovieList.map((watchedMovie) => (
        <WatchedMovie
          watchedMovie={watchedMovie}
          key={watchedMovie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
