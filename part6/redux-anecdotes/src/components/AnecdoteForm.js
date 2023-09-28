import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const newAnecdote = {
      content,
      id: getId(),
      votes: 0,
    };

    try {
      const createdAnecdote = await anecdoteService.createAnecdote(newAnecdote);
      dispatch(createAnecdote(createdAnecdote));
    } catch (error) {
      console.error("An error occurred while creating the anecdote:", error);
    }
  };

  return (
    <div>
      <br />
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
