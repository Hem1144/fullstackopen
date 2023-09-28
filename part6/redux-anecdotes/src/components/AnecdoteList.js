import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdoteAsync } from "../reducers/anecdoteReducer";
import Filter from "./Filter";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdoteAsync(anecdote));
    dispatch(setNotification(`you voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <Filter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id || Math.random()}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} vote
            {anecdote.votes !== 1 ? "s" : ""}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
