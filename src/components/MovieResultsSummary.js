import React from "react";

export default function MovieResultsSummary({ movies }) {
  const noOfMovies = movies.length;
  return (
    <p className="num-results">
      Found <strong>{noOfMovies}</strong> results
    </p>
  );
}
