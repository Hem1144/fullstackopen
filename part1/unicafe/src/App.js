import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, averageFun, positiveFun }) => {
  if (all) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={averageFun()} />
          <StatisticsLine text="positive" value={positiveFun()} />
        </tbody>
      </table>
    );
  } else {
    return "No feedback given";
  }
};

const App = () => {
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

  let total = good + Number(neutral) + bad;

  const avgFunc = () => {
    return ((good - bad) / total).toFixed(1);
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

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

export default App;
