import React from "react";

const Part = ({ part }) => {
  return (
    <p>
      {part.name} exercises {part.exercises}
    </p>
  );
};

export default Part;
