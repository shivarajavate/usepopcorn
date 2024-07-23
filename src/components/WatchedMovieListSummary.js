import React from "react";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function WatchedMovieListSummary({ watchedMovieList }) {
  const avgImdbRating = average(
    watchedMovieList.map((watchedMovie) => watchedMovie.imdbRating)
  );
  const avgUserRating = average(
    watchedMovieList.map((watchedMovie) => watchedMovie.userRating)
  );
  const avgRuntime = average(
    watchedMovieList.map((watchedMovie) => watchedMovie.runtime)
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span role="img" aria-label="hash">
            #️⃣
          </span>
          <span>{watchedMovieList.length} movies</span>
        </p>
        <p>
          <span role="img" aria-label="star">
            ⭐️
          </span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span role="img" aria-label="star">
            🌟
          </span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span role="img" aria-label="time">
            ⏳
          </span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}
