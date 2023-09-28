import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const reducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteForAnecdote: (state, action) => {
      const id = action.payload.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
        state.sort((a, b) => b.votes - a.votes);
      }
    },
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    initializeAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { voteForAnecdote, createAnecdote, initializeAnecdotes } =
  reducer.actions;

export const initializeAnecdotesAsync = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(initializeAnecdotes(anecdotes));
  };
};

export const createAnecdoteAsync = (content) => {
  return async (dispatch) => {
    const newAnecdote = {
      content,
      votes: 0,
    };
    const createdAnecdote = await anecdoteService.createAnecdote(newAnecdote);
    dispatch(createAnecdote(createdAnecdote));
  };
};

export default reducer.reducer;
