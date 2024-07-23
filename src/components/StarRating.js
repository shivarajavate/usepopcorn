import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const emptyStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="gold"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="{2}"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const fullStar = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="gold"
    stroke="gold"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

function getEmptyStar(color = "gold") {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function getFullStar(color = "gold") {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

StarRating.propTypes = {
  maxRating: PropTypes.number.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  defaultRating: PropTypes.number,
  onSetStarRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 10,
  color = "gold",
  size = "20px",
  defaultRating = 0,
  onSetStarRating = () => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const starContainerStyle = {
    display: "flex",
    gap: "4px",
  };

  const textStyle = {
    paddingLeft: "6px",
    fontSize: size,
    lineHeight: size,
    width: size,
    height: size,
    fontWeight: "bold",
    color: color,
    alignSelf: "center",
  };

  useEffect(() => {
    onSetStarRating(rating);
  }, [rating, onSetStarRating]);

  return (
    <div className="rating">
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i + 1}
            isFull={(tempRating || rating) >= i + 1}
            onRate={() => setRating(i + 1)}
            onTempRate={() => setTempRating(i + 1)}
            onResetTempRate={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
        <p style={textStyle}>{tempRating || rating || ""}</p>
      </div>
    </div>
  );
}

function Star({
  isFull,
  onRate,
  onTempRate,
  onResetTempRate,
  color = "gold",
  size = "20px",
}) {
  const starStyle = {
    color: color,
    width: size,
    height: size,
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onTempRate}
      onMouseLeave={onResetTempRate}
    >
      {isFull ? getFullStar(color) : getEmptyStar(color)}
    </span>
  );
}
