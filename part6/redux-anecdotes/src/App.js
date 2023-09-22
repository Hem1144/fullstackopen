import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, voteForAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };

  const vote = (id) => {
    dispatch(voteForAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <h2>Vote for Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} vote{anecdote.votes !== 1 ? "s" : ""}
            <button onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
        </div>
      ))}
      <br />
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
