import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total sum={course} />
    </div>
  );
};

export default Course;
