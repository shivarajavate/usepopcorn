import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StarRating from "./StarRating";
import { useKeydownEventHandler } from "../hooks/useKeydownEventHandler";

const KEY = "6ac594ed";

export default function SelectedMovie({
  id,
  watchedMovieList,
  onAddWatchedMovie,
  onRemoveSelectedMovieId,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRating, setUserRating] = useState(function () {
    return (
      watchedMovieList.find((watchedMovie) => watchedMovie.imdbID === id)
        ?.userRating ?? 0
    );
  });

  const alreadyWatchedMovie = !!watchedMovieList.find(
    (watchedMovie) => watchedMovie.imdbID === id
  );

  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setIsLoading(true);
        setErrorMessage("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useKeydownEventHandler("Backspace", handleRemoveWatchedMovie);

  function handleRemoveWatchedMovie() {
    onRemoveSelectedMovieId();
  }

  function handleUserRatingChange(rating) {
    setUserRating(Number(rating));
  }

  function handleAddWatchedMovie() {
    const newWatchedMovie = {
      imdbID: imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
    };
    onAddWatchedMovie(newWatchedMovie);
    onRemoveSelectedMovieId();
  }

  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && <Error message={errorMessage} />}
      {!isLoading && !errorMessage && (
        <>
          <div className="details">
            <header>
              <button className="btn-back" onClick={onRemoveSelectedMovieId}>
                ←
              </button>
              <img src={poster} alt={title} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span role="img" aria-label="star">
                    ⭐️
                  </span>
                  {imdbRating} IMDb rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!alreadyWatchedMovie && (
                  <>
                    <StarRating
                      maxRating={10}
                      size="20px"
                      defaultRating={Number(userRating)}
                      onSetStarRating={handleUserRatingChange}
                    />
                    {userRating > 0 && (
                      <button
                        className="btn-add"
                        onClick={handleAddWatchedMovie}
                      >
                        + Add to List
                      </button>
                    )}
                  </>
                )}
                {alreadyWatchedMovie && (
                  <p>This movie was rated {userRating} stars</p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </div>
          <div className="rating"></div>
        </>
      )}
    </>
  );
}
