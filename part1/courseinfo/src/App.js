function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  return (
    <div>
      <Heading course={course} />
      <Content parts={parts} />

      <Total parts={parts} />
    </div>
  );
}

const Heading = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};
const Content = (props) => {
  return props.parts.map((prop, index) => (
    <Part part={prop.name} exercises={prop.exercises} key={index} />
  ));
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};



const Total = (props) => {
  let totalExe = 0;
  props.parts.forEach((ele) => {
    totalExe += ele.exercises;
  });
  return <p>Number of exercises {totalExe}</p>;
};


export default App;
