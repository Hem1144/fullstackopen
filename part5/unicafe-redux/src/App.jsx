import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementGood,
  incrementOk,
  incrementBad,
  resetFeedback,
} from "./actions";

const App = () => {
  const dispatch = useDispatch();
  const feedback = useSelector((state) => state);

  return (
    <div>
      <button onClick={() => dispatch(incrementGood())}>good</button>
      <button onClick={() => dispatch(incrementOk())}>oK</button>
      <button onClick={() => dispatch(incrementBad())}>bad</button>
      <button onClick={() => dispatch(resetFeedback())}>reset stats</button>

      <p>Good: {feedback.good}</p>
      <p>OK: {feedback.ok}</p>
      <p>Bad: {feedback.bad}</p>
    </div>
  );
};

export default App;
