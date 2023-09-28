// components/AnecdoteList.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdoteAsync } from "../reducers/anecdoteReducer";
import Filter from "./Filter";
import { setNotificationWithDuration } from "../reducers/notificationReducer";

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
    dispatch(
      setNotificationWithDuration(`you voted '${anecdote.content}'`, 10)
    );
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
