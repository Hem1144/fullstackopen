import { useState } from "react";

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

  let avg = 0;
  if (good > 0 || neutral > 0 || bad > 0) {
    avg = (good - bad) / total;
  }

  let pos = 0;
  if (good > 0 || neutral > 0 || bad > 0) {
    pos = (good / total) * 100;
  }

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
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total} </p>
        <p>average {avg} </p>
        <p>positive {pos}% </p>
      </div>
    </>
  );
};

export default App;
