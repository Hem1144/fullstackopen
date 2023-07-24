const Course = ({ course }) => {
  return (
    <div>
      {course.map((ele) => {
        return (
          <div key={ele.id}>
            <Header text={ele.name} />
            <Content content={ele.parts} />
          </div>
        );
      })}
    </div>
  );
};

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        <span>total of </span>
        {parts.reduce(
          (accum, currtVal) => (accum = accum + currtVal.exercises),
          0
        )}
        <span> excercises</span>
      </b>
    </p>
  );
};

const Part = ({ courseName, courseExcercise }) => {
  return (
    <p>
      {courseName} {courseExcercise}
    </p>
  );
};

const Content = ({ content }) => {
  return (
    <>
      {content.map((val) => {
        return (
          <Part
            key={val.id}
            courseName={val.name}
            courseExcercise={val.exercises}
          />
        );
      })}
      <Total parts={content} />
    </>
  );
};

export default Course;
