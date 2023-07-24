import React from "react";

const Total = ({ sum }) => {
  return (
    <>
      <p>
        <b>
          <span>total of </span>
          {sum.parts.reduce(
            (accum, currentVal) => (accum += currentVal.exercises),
            0
          )}
          <span> exercises</span>
        </b>
      </p>
    </>
  );
};

export default Total;
