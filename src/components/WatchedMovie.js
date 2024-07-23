import React from "react";

export default function WatchedMovie({ watchedMovie, onDeleteWatchedMovie }) {
  return (
    <li>
      <img src={watchedMovie.Poster} alt={`${watchedMovie.Title} poster`} />
      <h3>{watchedMovie.Title}</h3>
      <div>
        <p>
          <span role="img" aria-label="star">
            ⭐️
          </span>
          <span>{watchedMovie.imdbRating}</span>
        </p>
        <p>
          <span role="img" aria-label="star">
            🌟
          </span>
          <span>{watchedMovie.userRating}</span>
        </p>
        <p>
          <span role="img" aria-label="time">
            ⏳
          </span>
          <span>{watchedMovie.runtime} min</span>
        </p>
        <button
          onClick={() => onDeleteWatchedMovie(watchedMovie.imdbID)}
          className="btn-delete"
        >
          <span role="img" aria-label="close">
            ❌
          </span>
        </button>
      </div>
    </li>
  );
}
