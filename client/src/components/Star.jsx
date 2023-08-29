import React from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

export default function Star({ rating }) {
  const starRating = Array.from({ length: 5 }, (element, index) => {
    const number = index + 0.5; // to show half star.

    return (
    // i = [0,1,2,3,4]
      <span key={index}>
        {
                // eslint-disable-next-line no-nested-ternary
                rating >= index + 1 ? (<FaStar />) : rating >= number ? (<FaStarHalfAlt />) : (<AiOutlineStar />)
            }
      </span>
    );
  });

  return (
    <div className="flex ml-2">
      {starRating}
    </div>
  );
}
