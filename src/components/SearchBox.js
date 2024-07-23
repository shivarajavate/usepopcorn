import React, { useRef, useEffect } from "react";
import { useKeydownEventHandler } from "../hooks/useKeydownEventHandler";

export default function SearchBox({ query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  useKeydownEventHandler("Enter", handleClearMovieQuery);

  function handleClearMovieQuery() {
    if (document.activeElement === inputElement?.current) return;
    setQuery("");
    inputElement.current.focus();
  }

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
