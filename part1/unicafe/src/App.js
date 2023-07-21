import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, averageFun, positiveFun }) => {
  if (averageFun()) {
    return (
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {averageFun()}</p>
        <p>postive {positiveFun()} % </p>
      </>
    );
  } else {
    return "No feedback given";
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClicker = () => {
    setGood(good + 1);
  };
  const neutralClicker = () => {
    setNeutral(neutral + 1);
  };
  const badClicker = () => {
    setBad(bad + 1);
  };

  let total = good + neutral + bad;

  const avgFunc = () => {
    return (good - bad) / total;
  };

  const posFunc = () => {
    return (good / total) * 100;
  };

  return (
    <>
      <div>
        <h1>give feedback</h1>
      </div>
      <div>
        <button onClick={goodClicker}>good</button>
        <button onClick={neutralClicker}>neutral</button>
        <button onClick={badClicker}>bad</button>
      </div>
      <h1>statistics</h1>
      <div>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={total}
          averageFun={avgFunc}
          positiveFun={posFunc}
        />
      </div>
    </>
  );
};

export default App;
