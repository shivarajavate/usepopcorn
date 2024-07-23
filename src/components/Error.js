import React from "react";

export default function Error({ message }) {
  return (
    <div className="error">
      <span role="img" aria-label="error">
        ⛔️
      </span>
      {message}
    </div>
  );
}
